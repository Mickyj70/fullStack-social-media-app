const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
});

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  text: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
