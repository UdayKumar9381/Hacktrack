const mongoose = require('mongoose');

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^[0-9]{10}$/;  // Adjust the regex based on your phone format

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Make name required
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: emailRegex,  // Add email validation
  },
  phone: { 
    type: String, 
    match: phoneRegex,  // Add phone validation
    sparse: true,  // This allows for empty phone numbers (in case it's optional)
  },
  address: { type: String, default: '' },  // Default empty string if no address
  skills: { 
    type: [String], 
    default: [],  // Default empty array if no skills
    validate: [arrayLimit, '{PATH} exceeds the limit of 10 skills'],  // Optional array validation
  },
  resume: { type: String, default: '' }, // Storing resume as a URL or file location
  profilePicture: { type: String, default: '' }, // Store URL or path to file
  role: { type: String, default: 'Hackathon Enthusiast' },
  googleId: { type: String, unique: true, sparse: true },
  twitterId: { type: String, unique: true, sparse: true },
});

// Limit array size to 10 skills (this is optional based on your use case)
function arrayLimit(val) {
  return val.length <= 10;
}

module.exports = mongoose.model('User', userSchema);
