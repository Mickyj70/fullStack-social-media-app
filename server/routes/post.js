const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.handleLogin);

module.exports = router;
