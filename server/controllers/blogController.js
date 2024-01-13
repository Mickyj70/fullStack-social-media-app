const Blog = require("../model/Blog");
const User = require("../model/User");

//get all blogs uploaded
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//add blog by user
const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser = await User.findById(user);
  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await Mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  return res.status(201).json({ blog });
};

//update blog by user
const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findOneAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  if (!blog) {
    res.status(500).json({ message: "unable to update the info" });
  }
  return res.status(200).json({ blog });
};

const deleteBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId).populate("user");
    await deletedBlog.user.blogs.pull(deletedBlog);
    await deletedBlog.user.save();
    // const user = await User.findById(deletedBlog.user);
    // user.blogs = user.blogs.filter((blog) => blog.id !== blogId);
    // await user.save();

    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//specific blog by id
const getBlog = async (req, res, next) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get the specific blogs nd details of a user
const getBlogsByUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).populate("blogs");
    res.status(200).json(user.blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  getBlogsByUser,
};
