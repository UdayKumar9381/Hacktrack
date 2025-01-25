const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // For generating secure OTPs
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Temporary in-memory storage for OTPs (for development purposes)
const otpStorage = {};

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL, // Email from .env
    pass: process.env.EMAIL_PASSWORD, // Password from .env
  },
});

// Route to send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStorage[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // Store OTP with expiry

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your Admin Login OTP',
      text: `Your OTP for login is: ${otp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({ success: true, message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Error sending OTP. Please try again.' });
  }
});

// Route to verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
  }

  const storedOtp = otpStorage[email];

  if (!storedOtp) {
    return res.status(400).json({ success: false, message: 'OTP not found. Please request a new OTP.' });
  }

  if (Date.now() > storedOtp.expiresAt) {
    delete otpStorage[email];
    return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new OTP.' });
  }

  if (storedOtp.otp !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP. Please try again.' });
  }

  // Clear OTP after successful validation
  delete otpStorage[email];
  res.status(200).json({ success: true, message: 'OTP verified successfully.' });
});

module.exports = router;
