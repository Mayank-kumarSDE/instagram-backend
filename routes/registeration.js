const express = require("express")
const router = express.Router();
const registeruser = require("../controller/registercontroller")
const loginuser = require("../controller/logincontroller")
const user = require("../database/usermodel")
const auth = require("../middleware/auth")
router.post("/registeration",registeruser)
router.post("/login",loginuser)
router.get("/info",auth, async(req,res)=>{
    try{
        console.log("hiiii");
        const finduser = await user.find({username:req.displayname});
        if(finduser.length!==0){
            return res.status(200).json(finduser)
        }
        return res.status(404).json({message:"no user is found"});
        }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
})
module.exports = router