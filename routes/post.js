const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");
const auth = require("../middleware/auth")
const post = require("../database/postmodel")
const router = express.Router();
const addposttouser = require("../controller/addposttouser");

const uploadDir = path.join(__dirname, "../uploads");
console.log("Upload directory absolute path:", uploadDir);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 uploads folder created at:", uploadDir);
}

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const uploadLocal = multer({ storage: localStorage });


router.post("/createpost",auth ,uploadLocal.single("image"),async (req, res) => {
    try{
      if (!req.file) {
        return res.status(400).json({
          error: "No file uploaded",
          hint: "Make sure the Postman key name is 'image' and Body type is form-data"
        });
      }


      const localPath = req.file.path;

      // ✅ Upload to Cloudinary manually
      const result = await cloudinary.uploader.upload(localPath, {
        folder: "instagram-posts",
        resource_type: "image",
      });

      // ✅ Create post entry in MongoDB
      const newpost = new post({
        caption: req.body.caption,
        imageurl: result.secure_url, // cloud image
        author: req.userid,
      });
      await newpost.save();


      // try to save photo of user in user posts
      await addposttouser(req.userid,newpost._id)


      res.status(201).json({
        message: "Post uploaded successfully",
        post: newpost,
      });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Server error",details : err.message });
    }
});

module.exports  = router;
