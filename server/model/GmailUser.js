const mongoose = require("mongoose");

const GmailSchema = new mongoose.Schema(
  {
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
    provider: {
      type: String,
    },
    // facebookId: {
    //   type: String,
    // },
    // githubId: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

const Gmail = mongoose.model("Gmail", GmailSchema);
module.exports = Gmail;
