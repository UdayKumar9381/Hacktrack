const express = require('express');
const Registration = require('../models/registration');

const router = express.Router();

// Fetch hackathon participation details by email
router.get('/participation/:email', async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ status: 'Failed', message: 'Email is required' });
        }

        // Fetch all hackathons registered by the user based on email
        const participations = await Registration.find({ email }, '-__v');

        if (participations.length === 0) {
            return res.status(404).json({ status: 'Failed', message: 'No participation records found' });
        }

        res.status(200).json({ status: 'Success', data: participations });
    } catch (err) {
        res.status(500).json({ status: 'Failed', message: err.message });
    }
});

module.exports = router;