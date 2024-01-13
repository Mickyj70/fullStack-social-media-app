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
