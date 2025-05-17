const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const College = require('../models/College');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { collegeName, collegeEmail, phoneNumber, collegeCode, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingCollege = await College.findOne({ collegeEmail });
    if (existingCollege) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const college = new College({
      collegeName,
      collegeEmail,
      phoneNumber,
      collegeCode,
      password: hashedPassword,
    });

    await college.save();
    res.status(201).json({ message: 'College registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering college', error: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { collegeEmail, password, rememberMe } = req.body;

  try {
    const college = await College.findOne({ collegeEmail });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, college.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: college._id }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '365d' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


// Fetch College Details
router.get('/details', auth, async (req, res) => {
  try {
    console.log('College ID from token:', req.college.id); // Debugging line
    const college = await College.findById(req.college.id).select('-password');
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching college details', error: error.message });
  }
});


module.exports = router;
