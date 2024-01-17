const User = require("../model/User");
const sendEmail = require("../middleware/email");
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
        new CustomError(
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
