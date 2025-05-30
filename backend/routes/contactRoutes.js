const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST: Submit Contact Form 
router.post('/submit', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Save to DB
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// GET: Fetch All Messages (Optional)
router.get('/messages', async (req, res) => {
    try {
        const messages = await Contact.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
