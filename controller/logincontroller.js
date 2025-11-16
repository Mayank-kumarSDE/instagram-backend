const user = require("../database/usermodel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
async function loginuser(req,res){
    const {username , password} = req.body;
    try{
        if(!username || !password){
            return res.status(400).json({message :"username and password both is required"})
        }
        const currentuser = await user.findOne({ username: username.toLowerCase() }).select('+password');
        if (!currentuser) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const ans = await bcrypt.compare(password, currentuser.password);
        if (!ans) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign({ id: currentuser._id,username:currentuser.username , email:currentuser.email},"mayank", { expiresIn: "2h" })
        res.cookie("token",token);
        return res.status(200).json({message:"login successfully",
            user:{ 
                username : currentuser.username,
                email : currentuser.email
            }
        })

    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error" });
    }
}
module.exports = loginuser