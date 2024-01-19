const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/:id/comment", commentController.commentOnBlog);

module.exports = router;
