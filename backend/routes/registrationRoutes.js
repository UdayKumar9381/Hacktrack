const express = require('express');
const Registration = require('../models/registration');
const sendEmail = require('../utils/emailService'); // Import the email service

const router = express.Router();

// Register a new participant
router.post('/register', async (req, res) => {
  try {
    const { name, studentId, yearOfStudy, branch, email, hackathonName, collegeName, organisation, date, } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ status: 'Failed', message: 'Name is required' });
    }
    if (!hackathonName) {
      return res.status(400).json({ status: 'Failed', message: 'Hackathon name is required' });
    }
    if (!collegeName) {
      return res.status(400).json({ status: 'Failed', message: 'College name is required' });
    }
    if (!organisation) {
      return res.status(400).json({ status: 'Failed', message: 'Organisation is required' });
    }

    // Create a new registration
    const registration = new Registration({
      name,
      rollno: studentId,
      yearOfStudy,
      branch,
      email,
      hackathonName,
      collegeName,
      organisation,
      date,
    });

    await registration.save();

    // Send email to the student
    const emailSubject = 'Hackathon Registration Successful';
    const emailContent = `
      <h1>Congratulations, ${name}!</h1>
      <p>You have successfully registered for the hackathon "${hackathonName}".</p>
      <h2>Registration Details:</h2>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Student ID:</strong> ${studentId}</li>
        <li><strong>Year of Study:</strong> ${yearOfStudy}</li>
        <li><strong>Branch:</strong> ${branch}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Hackathon Name:</strong> ${hackathonName}</li>
        <li><strong>College Name:</strong> ${collegeName}</li>
        <li><strong>Organisation:</strong> ${organisation}</li>
        <li><strong>Date:</strong> ${date}</li>
      </ul>
      <p>Thank you for registering. We look forward to seeing you at the hackathon!</p>
    `;

    await sendEmail(email, emailSubject, emailContent);

    res.status(201).json({ status: 'Success', data: { registration } });
  } catch (err) {
    res.status(500).json({ status: 'Failed', message: err.message });
  }
});

router.get('/registrations', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ status: 'Failed', message: err.message });
  }
});



module.exports = router;