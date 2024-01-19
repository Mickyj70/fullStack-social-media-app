const Blog = require("../model/Blog");

exports.likeUserBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    if (!blog.likes.includes(req.body.userId)) {
      blog.likes.push(req.body.userId);
      await blog.save();
      return res.send("Blog liked");
    } else {
      return res.send("Blog already liked");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.unlikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    const userIndex = blog.likes.indexOf(req.body.userId);

    if (userIndex > -1) {
      blog.likes.splice(userIndex, 1);
      await blog.save();
      return res.send("Blog unliked");
    } else {
      return res.send("Blog not liked yet");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
