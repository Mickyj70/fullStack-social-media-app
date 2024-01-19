const Blog = require("../model/Blog");

exports.commentOnBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }
    const comment = {
      user: req.body.userId,
      text: req.body.text,
      createdAt: Date.now(),
    };
    blog.comments.push(comment);
    await blog.save();
    return res.status(201).send("Comment added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
