const express = require('express');
const bcrypt = require('bcrypt'); // Use bcrypt for password comparison
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = req.db;
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
