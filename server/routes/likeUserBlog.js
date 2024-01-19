const express = require("express");
const router = express.Router();
const likeUserController = require("../controllers/likeUserController");

router.put("/:id/like", likeUserController.likeUserBlog);
router.delete("/:id/unlike", likeUserController.unlikeBlog);

module.exports = router;
