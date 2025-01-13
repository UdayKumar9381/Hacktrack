const express = require('express');
const bcrypt = require('bcrypt'); // Use bcrypt for password hashing
const router = express.Router();
const User = require('../models/User'); // Ensure User model is correct

// Signup route
router.post('/signup', async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  // Validate input
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ fullName, email, phone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful!' });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
