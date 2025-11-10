const express = require("express")
const router = express.Router();
const loginuser = require("../controller/logincontroller");
router.post("/login" ,loginuser);
module.exports = router;