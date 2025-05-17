const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send an email
const sendEmail = async (to, subject, htmlContent) => {
  try {
    // Validate recipient email
    if (!to || !to.includes('@')) {
      throw new Error('Invalid recipient email address');
    }

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to, // Recipient email
      subject, // Email subject
      html: htmlContent, // Email content (HTML format)
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error for handling in the route
  }
};

module.exports = sendEmail;