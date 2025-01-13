const express = require('express');
const Hackathon = require('../models/Hackathon');

const router = express.Router();

// Add Hackathon
router.post('/:category', async (req, res) => {
  try {
    const hackathon = new Hackathon({ ...req.body, category: req.params.category });
    await hackathon.save();
    res.status(201).json({ message: 'Hackathon added successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error adding hackathon' });
  }
});

// Delete Hackathon
router.delete('/:id', async (req, res) => {
  try {
    await Hackathon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hackathon deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting hackathon' });
  }
});

// Update Hackathon
router.put('/:id', async (req, res) => {
  try {
    await Hackathon.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Hackathon updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error updating hackathon' });
  }
});

// Retrieve Hackathons
router.get('/:category', async (req, res) => {
  try {
    const hackathons = await Hackathon.find({ category: req.params.category });
    res.json(hackathons);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching hackathons' });
  }
});

module.exports = router;
