const express = require("express");
const router = express.Router();
const forgotPasswordController = require("../controllers/forgotPasswordController");

router.post("/forgotpassword", forgotPasswordController.forgotPassword);
router.patch("/forgotpassword/:token", forgotPasswordController.resetPassword);
