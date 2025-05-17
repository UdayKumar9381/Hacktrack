const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/hoster_homepage');

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET; // Change this to a secure key

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, phone, college, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, college, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Fetch all users
router.get('/hoster', async (req, res) => {
  try {
    const users = await User.find({}, 'name email phone college'); // Fetch required fields
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Fetch total count of registered users
router.get('/hoster/count', async (req, res) => {
  try {
    const count = await User.countDocuments(); // Count all documents in the User collection
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user count" });
  }
});


module.exports = router;
