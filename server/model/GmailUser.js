const mongoose = require("mongoose");

const GmailSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  //accountId can be google Id, facebook Id, github Id etc.
  accountId: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
  photoURL: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  provider: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  ],

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
  refreshToken: String,
  // facebookId: {
  //   type: String,
  // },
  // githubId: {
  //   type: String,
  // },
});

const Gmail = mongoose.model("Gmail", GmailSchema);
module.exports = Gmail;
