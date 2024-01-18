const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/.test(v);
      },
      message:
        "Password must contain at least one uppercase, one lowercase, one number and minimum 6 characters",
    },
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: "Confirm password must match password",
    },
  },
  IsAdmin: {
    type: Boolean,
    default: false,
  },
  blogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
      required: true,
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

  passwordResetToken: String,
  passwordResetExpires: Date,
});
UserSchema.methods.createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 3600000; // 1 hour

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
