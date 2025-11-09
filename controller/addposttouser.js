const user = require("../database/usermodel");
async function addposttouser(userid,newpostid){
    try{
        await user.findByIdAndUpdate(userid,{$push: {posts:newpostid},})
        console.log("photo is saved in user profile")
    }
    catch(err){
        console.error("photo is not saved to user profile",err.message);
    }
}
module.exports = addposttouser;