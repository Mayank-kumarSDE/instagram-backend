const express = require("express");
const user = require("../database/usermodel")
const router = express.Router();
const auth = require("../middleware/auth")
router.get("/own" , auth , async(req,res)=>{
    if(!req.userid){
        return res.status(500).json({message:"profile does not exist"});
    }
    try{
        const userprofile = await user.findById(req.userid).select('-password -__v -email');
        console.log("user's profile is sucessfully fetched");
        return res.status(200).json(userprofile)
    }
    catch(err){
        console.error("can not able to fetch user's profile due to ",err.message);
        return res.status(500).json({"error":err});
    }
})
router.get("/others/:id",auth,async(req,res)=>{
    try{
        const otherusername = req.params.id
        const otheruserprofile = await  user.findOne({username : otherusername}).select('-password -__v -email');
        if(!otheruserprofile){
            return res.status(400).json({message:"user not found"})
        }
        console.log("other person  profile is sucessfully fetched");
        return res.status(200).json(otheruserprofile)
    }
    catch(err){
        console.error("Unable to fetch other user's profile:", err.message);
        return res.status(500).json({ error: err.message });
    }
})
module.exports = router;