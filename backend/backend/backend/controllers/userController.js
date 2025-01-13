const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config(); // For environment variables

// Temporary in-memory storage for OTPs (with expiry handling)
let otps = {}; 

// OTP email transporter using environment variables for security
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Use email stored in environment variables
        pass: process.env.EMAIL_PASSWORD, // Use email password from environment
    },
});

// Helper function to set OTP expiry (10 minutes)
const setOtpExpiry = (email) => {
    setTimeout(() => {
        delete otps[email]; // Delete OTP after 10 minutes
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
};

exports.sendOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    otps[email] = otp;
    setOtpExpiry(email); // Set OTP expiry

    // Send OTP via email
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Login',
        text: `Your OTP for login is: ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'OTP sent successfully.' });
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        res.status(500).json({ message: 'Error sending OTP.' });
    }
};

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required.' });

    if (otps[email] === otp) {
        delete otps[email]; // OTP verified successfully
        res.json({ message: 'Login successful.' });
    } else {
        res.status(401).json({ message: 'Invalid OTP.' });
    }
};

exports.signup = async (req, res) => {
    const { fullName, email, phone } = req.body;
    if (!fullName || !email || !phone) return res.status(400).json({ message: 'All fields are required.' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'Email already registered.' });

        const newUser = new User({ fullName, email, phone });
        await newUser.save();

        res.json({ message: 'Signup successful.' });
    } catch (error) {
        console.error('Error during signup:', error.message);
        res.status(500).json({ message: 'Error during signup.' });
    }
};
