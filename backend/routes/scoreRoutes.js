const express = require('express');
const router = express.Router();
const Scorecard = require('../models/scorecard'); // Adjust path as needed
const Registration = require('../models/registration'); // Adjust path as needed
const mongoose = require('mongoose');
const auth = require('../middleware/auth');  // Assuming you have auth middleware

// Get all scores
router.get('/scores', async (req, res) => {
  try {
    const scores = await Scorecard.find().populate('studentId');
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get score by student ID
// Get all scores with required fields
// Get score by student email or ID
router.get('/student-score', async (req, res) => {
  const { email, studentId } = req.query;

  if (!email && !studentId) {
    return res.status(400).json({ message: 'Email or Student ID is required' });
  }

  try {
    let query = {};
    if (email) {
      query.email = email;
    } else if (studentId) {
      query.studentId = studentId;
    }

    const score = await Scorecard.findOne(query, {
      hackathonName: 1,
      email: 1,
      organisation: 1,
      score: 1,
      _id: 0
    });

    if (!score) {
      return res.status(404).json({ message: 'Score not found for this student' });
    }

    res.status(200).json(score);
  } catch (error) {
    console.error('Error fetching student score:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update or create a score for a student
router.post('/update-score', async (req, res) => {
  const { studentId, score } = req.body;

  console.log("Received Data:", { studentId, score }); // Debugging

  if (!studentId || score === undefined) {
    return res.status(400).json({ message: 'Invalid student ID or score' });
  }

  try {
    // Find the student in the Registration collection
    const student = await Registration.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Save the score in the Scorecard collection
    const scorecard = await Scorecard.findOneAndUpdate(
      { studentId: student._id }, // Find by studentId
      { 
        studentId: student._id,
        name: student.name,
        rollno: student.rollno,
        email: student.email,
        yearOfStudy: student.yearOfStudy,
        branch: student.branch,
        hackathonName: student.hackathonName,
        collegeName: student.collegeName,
        organisation: student.organisation,
        score: score, // Update the score
        evaluatedAt: Date.now() // Add evaluation timestamp
      },
      { upsert: true, new: true } // Create if not exists, return updated document
    );

    console.log("Updated Scorecard:", scorecard); // Debugging

    res.status(200).json({ message: 'Score updated successfully', data: scorecard });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Bulk update scores
router.post('/update-score', async (req, res) => {
  const { studentId, score } = req.body;

  console.log("Received Data:", { studentId, score }); // Debugging

  if (!studentId || score === undefined) {
    return res.status(400).json({ message: 'Invalid student ID or score' });
  }

  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      studentId,
      { score },
      { new: true }
    );

    console.log("Updated Registration:", updatedRegistration); // Debugging

    if (!updatedRegistration) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Score updated successfully', data: updatedRegistration });
  } catch (error) {
    console.error('Error updating score:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a score
router.delete('/score/:studentId', auth, async (req, res) => {
  try {
    const { studentId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID format' });
    }
    
    const result = await Scorecard.findOneAndDelete({ studentId });
    
    if (!result) {
      return res.status(404).json({ message: 'Score not found for this student' });
    }
    
    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    console.error('Error deleting score:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get statistics for scores (min, max, avg)
router.get('/score-stats', async (req, res) => {
  try {
    const stats = await Scorecard.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: '$score' },
          minScore: { $min: '$score' },
          maxScore: { $max: '$score' },
          totalEvaluated: { $sum: 1 }
        }
      }
    ]);
    
    if (stats.length === 0) {
      return res.json({
        averageScore: 0,
        minScore: 0,
        maxScore: 0,
        totalEvaluated: 0
      });
    }
    
    res.json(stats[0]);
  } catch (error) {
    console.error('Error fetching score statistics:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;