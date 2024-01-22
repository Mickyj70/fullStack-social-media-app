const Blog = require("../model/Blog");
const Comment = require("../model/comments");

exports.commentOnBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    // Create the comment
    const newComment = await Comment.create({
      user: req.body.userId,
      text: req.body.text,
    });

    // Add comment ObjectId to blog
    blog.comments.push(newComment._id);

    await blog.save();

    return res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// const Blog = require("../model/Blog");
// const Comment = require("../model/Comment");

// exports.commentOnBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) {
//       return res.status(404).send("Blog not found");
//     }
//     const comment = {
//       user: req.body.userId,
//       text: req.body.text,
//     };
//     blog.comments.push(comment);
//     await blog.save();
//     return res.status(201).send("Comment added");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// };
