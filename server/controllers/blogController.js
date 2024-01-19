const mongoose = require("mongoose");

const Blog = require("../model/Blog");
const User = require("../model/User");

//get all blogs uploaded
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//add blog
//add blog by user
const addBlog = async (req, res) => {
  const { title, description, image, userId } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const blog = await Blog.create({
      title,
      description,
      image,
      user: userId,
    });

    user.blogs.push(blog);
    await user.save({ session });
    await session.commitTransaction();

    res.status(201).json(blog);
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};

//update blog by user
const updateBlog = async (req, res) => {
  const { title, description } = req.body;
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { title, description },
      { new: true }
    );
    if (!blog) {
      throw new Error("Blog not found");
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      throw new Error("Blog not found");
    }

    const user = await User.findById(blog.user);
    user.blogs.pull(blog);
    await user.save();

    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get blog by ID
const getBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new Error("Blog not found");
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get blogs for user
const getBlogsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("blogs");

    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json(user.blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//like user blog
// const likeUserBlog = async (req, res) => {
//   try {
//     const post = await Blog.findById(req.params.id);
//     if (!post.likes.includes(req.body.userId)) {
//       await post.updateOne({ $push: { likes: req.body.userId } });
//       res.status(200).json("the post has been liked");
//     } else {
//       await post.updateOne({ $pull: { likes: req.body.userId } });
//       res.status(200).json("the post has been disliked");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getBlogsByUser,
  //  likeUserBlog,
};
