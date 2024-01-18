const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id/follow", userController.followUser);
router.put("/:id/unfollow", userController.unfollowUser);

module.exports = router;
