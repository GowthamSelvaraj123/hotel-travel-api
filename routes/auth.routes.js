const express = require("express");
const router = express.Router();
const {registerController, loginController, forgotPasswordController, resetPasswordController, logoutController} = require("../controllers/authController")

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

module.exports = router;