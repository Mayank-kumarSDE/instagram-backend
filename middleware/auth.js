/*
const Jwt =  require("jsonwebtoken");
function auth (req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message :"access denied . no token provided"})
    }
    try{
        const payload = Jwt.verify(token,"mayank");
        req.userid = payload.id;
        req.displayname = payload.username
        next();
    }
    catch(err){
        console.error("JWT verification failed:", err.message);
       return  res.status(403).json({message:"invalid or expired token"})
    }

}
module.exports = auth;
*/

const Jwt = require("jsonwebtoken");

function auth(req, res, next) {
  console.log("🔵 Auth middleware triggered");
  console.log("Cookies:", req.cookies);
  
  const token = req.cookies.token;
  
  if (!token) {
    console.log("❌ No token found");
    return res.status(401).json({ message: "access denied. no token provided" });
  }
  
  try {
    console.log("🔑 Token found, verifying...");
    const payload = Jwt.verify(token, "mayank");
    req.userid = payload.id;
    req.displayname = payload.username;
    console.log("✅ Token verified. User ID:", req.userid);
    next();
  } catch (err) {s
    console.error("❌ JWT verification failed:", err.message);
    return res.status(403).json({ message: "invalid or expired token" });
  }
}

module.exports = auth;