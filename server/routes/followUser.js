const express = require("express");
const router = express.Router();
const followController = require("../controllers/followUserController");

router.post("/", followController.followUser);

module.exports = router;
