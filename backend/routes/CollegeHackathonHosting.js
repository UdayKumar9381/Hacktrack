const express = require('express');
const multer = require('multer');
const sendEmail = require('../utils/emailService'); // Import the email service
const CollegeHackathonHosting = require('../models//CollegeHackathonHosting');

const router = express.Router();

// Multer for image uploads (store in 'uploads/' directory)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Create a hackathon
router.post('/create', upload.single('image'), async (req, res) => {
    try {
      console.log('Request Body:', req.body); // Log the request body
      const { name, description, startDate, endDate, location, collegeName, duration, userEmail } = req.body;
  
      // Validate required fields
      if (!name || !description || !startDate || !endDate || !location || !collegeName || !userEmail) {
        return res.status(400).json({ error: 'All fields are required, including userEmail' });
      }
  
      // Create a new hackathon
      const newHackathon = new CollegeHackathonHosting({
        name,
        description,
        image: req.file ? req.file.path : '', // Save the file path if an image is uploaded
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        location,
        collegeName,
        duration: duration || 3,
      });
  
      await newHackathon.save();
  
      // Send email to the user
      const emailSubject = 'Hackathon Created Successfully';
      const emailContent = `
        <h1>Congratulations!</h1>
        <p>You have successfully created the hackathon "${name}".</p>
        <h2>Hackathon Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Description:</strong> ${description}</li>
          <li><strong>Start Date:</strong> ${startDate}</li>
          <li><strong>End Date:</strong> ${endDate}</li>
          <li><strong>Location:</strong> ${location}</li>
          <li><strong>College/Company:</strong> ${collegeName}</li>
          <li><strong>Duration:</strong> ${duration} days</li>
        </ul>
        <p>Thank you for using our platform!</p>
      `;
  
      await sendEmail(userEmail, emailSubject, emailContent);
      console.log('Recipient Email:', userEmail);
  
      res.status(201).json(newHackathon);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  });


// Get all hackathons
router.get('/', async (req, res) => {
    try {
        const hackathons = await CollegeHackathonHosting.find();
        res.json(hackathons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get hackathons by status
router.get('/status/:status', async (req, res) => {
    try {
        const { status } = req.params;
        if (!['future', 'present', 'past'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status parameter' });
        }
        
        const hackathons = await CollegeHackathonHosting.find({ status });
        res.json(hackathons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a hackathon
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, description, startDate, endDate, location, collegeName, duration } = req.body;
        const updatedData = { 
            name, 
            description, 
            startDate, 
            endDate, 
            location, 
            collegeName,
            ...(duration && { duration: parseInt(duration) })
        };
        
        if (req.file) updatedData.image = req.file.path;

        const updatedHackathon = await CollegeHackathonHosting.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(updatedHackathon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a hackathon
router.delete('/delete/:id', async (req, res) => {
    try {
        await CollegeHackathonHosting.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hackathon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Force update statuses (for testing)
router.post('/update-statuses', async (req, res) => {
    try {
        const { updateHackathonStatuses } = require('../utils/cronJobs');
        await updateHackathonStatuses();
        res.json({ message: 'Hackathon statuses updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;