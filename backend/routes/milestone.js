const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust paths as needed 
const Submission = require('../models/Submission');
const Registration = require('../models/registration');

// Fetch milestone counts
router.get('/milestone-counts', async (req, res) => {
  try {
    // Fetch counts from the database
    const participantCount = await Registration.countDocuments(); // Total participants
    const alumniCount = await User.countDocuments({ role: 'alumni' }); // Alumni count (assuming you have a role field)
    const problemStatementCount = await Submission.countDocuments(); // Total problem statements
    const institutionCount = await Registration.distinct('collegeName').countDocuments(); // Unique institutions

    res.status(200).json({
      participants: participantCount,
      alumni: alumniCount,
      problemStatements: problemStatementCount,
      institutions: institutionCount,
    });
  } catch (error) {
    console.error('Error fetching milestone counts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;