const User = require("../model/User");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "email and password are required." });
  const foundEmail = await User.findOne({ email: email }).exec();
  if (!foundEmail) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = bcrypt.compare(password, foundEmail.password);
  if (match) {
    // create JWTs
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
    res.redirect("/user/blog"); // Successful authentication, redirect success
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
