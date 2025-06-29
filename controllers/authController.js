const crypto = require("crypto");
const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ status: false, message: "User already registered" });
    }

    const user = await User.create({ name, email, phone, password, role });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Register Successfully",
      html: `<p>Thank you for registering</p>`,
    });

    res.status(200).json({status: true, message: "User registered successfully", user: { id: user._id, name: user.name, email: user.email },token: generateToken(user),});
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    res.status(200).json({status: true, message: "Login successful", user: { id: user._id, name: user.name, email: user.email }, token: generateToken(user),});
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ status: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const message = `
      You requested a password reset. Click the link below to reset your password:\n\n
      ${resetUrl}\n\n
      This link is valid for 15 minutes.
    `;

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "Password Reset Email",
      text: message,
    });

    res.status(200).json({ status: true, message: "Reset email sent successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({resetPasswordToken: hashedToken,resetPasswordExpire: { $gt: Date.now() },});

    if (!user) {
      return res.status(400).json({ status: false, message: "Token is invalid or expired" });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({ status: true, message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ status: false, message: "Reset failed", error: err.message });
  }
};

const logoutController = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ status: true, message: "User logged out successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: "Server error", error: err.message });
  }
};

module.exports = {registerController, loginController, forgotPasswordController, resetPasswordController, logoutController};
