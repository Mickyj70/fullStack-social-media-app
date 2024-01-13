const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword)
    return res
      .status(400)
      .json({ message: "Username,,email and password are required." });
  // check for duplicate usernames and emails in the db
  const duplicate = await User.findOne({
    username: username,
    email: email,
  }).exec();
  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store the new user
    const result = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPwd,
      confirmPassword: hashedPwd,
      blogs: [],
    });
    res.status(201).json({ success: `New user ${username} created!` });
    res.redirect("/login");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser, getAllUsers };
