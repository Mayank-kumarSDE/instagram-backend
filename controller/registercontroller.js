const bcrypt = require("bcrypt")
const user = require("../database/usermodel");
const validator = require("validator");


async function registeruser(req,res){

    const mandatoryFeild = ["username","email","password"];
    const isallowed = mandatoryFeild.every((k)=>{return Object.keys(req.body).includes(k)});
    if(isallowed){
          const { email, username, password } = req.body;
        try {
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }
            if (!validator.isStrongPassword(password, { minLength: 8, minNumbers: 1, minSymbols: 1 })) {
                return res.status(400).json({
                    error: "Weak password. Must be at least 8 characters, include a number and a symbol.",
                });
            }
            if (username.length > 20) {
                return res.status(400).json({ error: "Username is too long (max 20 characters)" });
            }

            const validemail = await user.findOne({email});
            const validusername = await user.findOne({username})
            if(validemail || validusername){
                return res.status(400).json({error:"user already exist"})
            }
            const hashedpassword = await bcrypt.hash(password,10);
            const newuser = new user({email,username,password:hashedpassword})
            await newuser.save()
            return res.status(201).json({message:"user registeres successfully",
                user :{
                    id : newuser._id,
                    username : newuser.username,
                    email : newuser.email
                }
            })
        }
        catch(error){
            console.error("registeration error",error)
            return res.status(500).json({error:"server error"});
        }
    }
    else{
        return res.status(400).json({error:"requires feild is missing"})
    }
};
module.exports = registeruser;
