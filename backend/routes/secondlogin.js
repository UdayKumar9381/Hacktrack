const express = require('express');
const bcrypt = require('bcryptjs'); // If you plan to hash passwords later
const jwt = require('jsonwebtoken'); // For JWT implementation
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const multer = require("multer");
const path = require("path");
const User = require('../models/User'); // Adjust the path to your User model

const router = express.Router();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'udayreddi412@gmail.com',
        pass: 'nmhe errg xhpf rxxz', // Use App Passwords if 2FA is enabled
    },
});

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Signup handler
router.post('/signup', async (req, res) => {
    const { fullName, email, phone, collegeName, studentId, branch, dob, linkedin } = req.body;

    if (!fullName || !email || !phone || !collegeName || !studentId || !branch || !dob || !linkedin) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        const newUser = new User({ fullName, email, phone, collegeName, studentId, branch, dob, linkedin, profilePicture: "" });
        await newUser.save();

        return res.status(201).json({ message: 'Signup successful! Please login.' });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Error during signup', error: error.message });
    }
});

// Get user profile by email
router.get('/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Update user profile
router.put('/update-profile', async (req, res) => {
    try {
        const { email, fullName, phone, collegeName, studentId, branch, dob, linkedin, profilePicture } = req.body;
        
        // Find user by email and update
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        user.fullName = fullName;
        user.phone = phone;
        user.collegeName = collegeName;
        user.studentId = studentId;
        user.branch = branch;
        user.dob = dob;
        user.linkedin = linkedin;
        if (profilePicture) user.profilePicture = profilePicture; // Save profile picture if provided

        // Save updated user
        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload profile picture
router.post("/upload-profile-picture", upload.single("profilePicture"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const profilePictureUrl = `http://localhost:5002/uploads/${req.file.filename}`;

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.profilePicture = profilePictureUrl;
        await user.save();

        res.json({ message: "Profile picture uploaded successfully", profilePictureUrl });
    } catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).json({ message: "Server error" });
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

        // Clear OTP fields after successful verification
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');

        // Send user email and studentId in response
        return res.status(200).json({ 
            message: 'OTP verified successfully', 
            token, 
            email: user.email,
            studentId: user.studentId // Include studentId in response
        });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Failed to verify OTP' });
    }
});

module.exports = router;
