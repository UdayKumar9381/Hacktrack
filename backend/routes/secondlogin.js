const express = require('express');
const bcrypt = require('bcryptjs'); // If you plan to hash passwords later
const jwt = require('jsonwebtoken'); // For JWT implementation
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User'); // Adjust the path to your User model

const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hacktrack.khub09@gmail.com',
        pass: 'kpje ermf hqnd ayak', // Use App Passwords if 2FA is enabled
    },
});

// Signup handler
router.post('/signup', async (req, res) => {
    const { fullName, email, phone } = req.body;

    if (!fullName || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const newUser = new User({ fullName, email, phone });
        await newUser.save();

        return res.status(201).json({ message: 'Signup successful! Please login.' });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Error during signup', error: error.message });
    }
});

// Send OTP handler
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email?.trim()) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // Expires in 5 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await transporter.sendMail({
            from: 'udayreddi412@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        });

        return res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error during OTP sending:', error);
        return res.status(500).json({ message: 'Failed to send OTP' });
    }
});

// Verify OTP handler
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = crypto.randomBytes(32).toString('hex');

        return res.status(200).json({ 
            message: 'OTP verified successfully', 
            token 
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Failed to verify OTP' });
    }
});

module.exports = router;
