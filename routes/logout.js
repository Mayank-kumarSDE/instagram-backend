const auth = require("../middleware/auth")
const client = require("../config/redisconfig")
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
router.post("/logout",auth, async(req,res)=>{
    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);
        await client.set(`token:${token}`,"blocked");
        await client.expireAt(`token:${token}`,payload.exp);
        console.log("logout succesfully");
        res.json({ message: "Logout successful" });
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }

})
module.exports = router;