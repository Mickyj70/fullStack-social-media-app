const User = require("../model/User");
const sendEmail = require("../middleware/email");
const crypto = require("crypto");

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate and set password reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // Send email with reset link
    const resetUrl = `${req.protocol}://${req.get(
      host
    )}/api/v1/users/resetPassword/${resetToken}`;
    const message = `we have received a password reset request. Please use the link below to reset ur password ${resetUrl} note: this link will expire in an hour`;
    try {
      await sendEmail({
        email: user.email,
        subject: "password reset request",
        message: message,
      });

      res.status(200).json({
        status: "success",
        message: "Reset link sent to email",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      user.save({ validateBeforeSave: false });

      return next(
        new Error(
          "there was an error sending password request email. please try again later",
          500
        )
      );
    }

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  //if the user exists and if the token hasnt expired
  const token = await crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error(
      "Password reset token is invalid or has expired",
      400
    );
    next(error);
  }

  // resetting the users password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();

  user.save();

  //login the user
  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundEmail.email,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30m" }
  );
  const refreshToken = jwt.sign(
    { email: foundEmail.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "60d" }
  );
  // Saving refreshToken with current user
  foundEmail.refreshToken = refreshToken;
  const result = await foundEmail.save();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
};
