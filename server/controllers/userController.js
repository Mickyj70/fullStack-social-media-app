// update delete follow unfollow
const User = require("../model/User");

//get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

//update user
const updateUser = async (req, res) => {
  if (req.body.id === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can only update your own profile");
  }
};

//delete user
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("you can only delete your own profile");
  }
};

//follow user
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(currentUser._id)) {
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { followings: user._id } });
        res.status(200).json("you have followed this user");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
};

//unfollow user
const unfollowUser = async (req, res) => {
  if (req.user.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(currentUser._id)) {
        await Promise.all([
          user.updateOne({ $pull: { followers: currentUser._id } }),
          currentUser.updateOne({ $pull: { followings: user._id } }),
        ]);
        res.status(200).json("you have unfollowed this user");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
};
