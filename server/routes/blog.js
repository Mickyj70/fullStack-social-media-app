const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.getAllBlogs);
router.post("/", blogController.addBlog);
router.put("/", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);
router.get("/:id", blogController.getBlog);
router.get("/user/:id", blogController.getBlogsByUser);
// router.get("/:id/like", blogController.likeUserBlog);

module.exports = router;
