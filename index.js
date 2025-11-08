
require('dotenv').config();
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ Loaded" : "❌ Missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ Loaded" : "❌ Missing"
});
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/connection.js");
const user = require("./database/usermodel.js")
const registerroute = require("./routes/registeration.js");
const postroute = require("./routes/post.js")

const app = express();
app.use(express.json());
app.use(cookieParser()); 

(async () => {
  try {
    await connectDB();
    app.use("/auth",registerroute)
    app.use("/posts", postroute);
    app.get("/test", (req, res) => {
        res.json({ message: "Test works!" });
    });
    app.listen(4000, () => {
      console.log("🚀 Server running on http://localhost:4000");
    });
  }
  catch (err) {
    console.error("💥 Failed to start app:", err);
    process.exit(1);
  }
})();