const Post = require("../model/Post");
const bcrypt = require("bcrypt");

const createPost = async (req, res) => {
  const newPost = await bcrypt.hash(req.body.content, 10);
  const newPostObject = new Post({ content: newPost });
  try {
    newPostObject.save();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
  return res.status(200).json({ message: "Post created" });
};

module.exports = { createPost };
