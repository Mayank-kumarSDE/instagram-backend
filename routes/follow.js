const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const follow = require("../controller/followcontroller")
router.get("/:id",auth,follow)
module.exports = router