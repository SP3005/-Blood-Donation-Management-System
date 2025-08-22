const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const PasswordReset = require('../models/PasswordReset');
const sendResetEmail = require('../utils/sendResetEmail');
const sendRegistrationEmail = require("../utils/sendRegistrationEmail");
require("dotenv").config();

const router = express.Router();

// Register User // 

router.post("/register", async (req, res) => {
  const { name, email, phone, location, bloodgroup, dob, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: "Phone number must be 10 digits." });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    const dobDate = new Date(dob);
    const today = new Date();
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
    eighteenYearsAgo.setHours(0, 0, 0, 0);

    if (dobDate >= eighteenYearsAgo) {
      return res.status(400).json({ error: "You must be older than 18 years to register." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, phone, location, bloodgroup, dob, role, password: hashedPassword });

    await user.save();
    
     // Send welcome email
     const subject = "Welcome to Share Life, Give Blood!";
     const html = `
       <h2>Hi ${name},</h2>
       <p>Thank you for joining <strong>Share Life, Give Blood</strong>! 💉</p>
       <p>We’re excited to have you on board. You’re now part of a life-saving community.</p>
       <br/>
       <p>Stay safe and healthy!</p>
     `;
     await sendRegistrationEmail(email, subject, html);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login User // 

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Ensure role is sent in response
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Profile // 

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Forgot Password // 

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');

    // Store token in DB
    await PasswordReset.create({ userId: user._id, token });

    // Create link
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Send email
    await sendResetEmail(user.email, resetLink);

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password //

router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const resetEntry = await PasswordReset.findOne({ token });
    if (!resetEntry) return res.status(400).json({ message: 'Invalid or expired token' });

    const user = await User.findById(resetEntry.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Remove used token
    await PasswordReset.deleteOne({ token });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password' });
  }
});


module.exports = router;
