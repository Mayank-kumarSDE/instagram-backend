const express = require("express");
const user = require("../database/usermodel");
async function follow(req,res){
    const whouwanttofollow = req.params.id
    const userid = req.userid;
    const username = req.displayname
    try{

        if(!whouwanttofollow){
           return res.status(400).json({message:"give valid username"});
        }


        if(whouwanttofollow===username){
           return res.status(400).json({message:"you can not follow yourself"});
        }


        const whouwanttofollowprofile = await user.findOne({username:whouwanttofollow})


        if (!whouwanttofollowprofile) {
            return res.status(404).json({ message: "User not found" });
        }


         const currentUser = await user.findById(userid);


        if (currentUser.following.includes(whouwanttofollowprofile._id)) {
            return res.status(400).json({ message: "You are already following this user" });
        }


        await user.findByIdAndUpdate(userid , {$push : {following:whouwanttofollowprofile._id},});
        console.log(`${whouwanttofollow} has been added into following list`);
        await user.findByIdAndUpdate(whouwanttofollowprofile._id, {$push : {followers:userid},});
        console.log(`${userid} has been added into followers list`);

        return res.status(200).json({ message: "Successfully followed user", followedUser: whouwanttofollow});

    }
    catch(err){
        console.error("follow error",err);
        return res.status(500).json({error:"server error"});
    }
}
module.exports = follow;