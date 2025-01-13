const express = require('express');
const Registration = require('../models/registration');

const router = express.Router();

// Register a new participant
router.post('/register', async (req, res) => {
    const registration = new Registration(req.body);
    try {
        await registration.save();
        res.status(201).json({ status: 'Success', data: { registration } });
    } catch (err) {
        res.status(500).json({ status: 'Failed', message: err.message });
    }
});

// Get all registrations
router.get('/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.status(200).json({ status: 'Success', data: registrations });
    } catch (err) {
        res.status(500).json({ status: 'Failed', message: err.message });
    }
});

module.exports = router;
