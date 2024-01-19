const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],

  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
