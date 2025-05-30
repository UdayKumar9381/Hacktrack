const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  collegeEmail: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  collegeCode: { type: String, required: true, unique: true }, // Unique College Code 
  password: { type: String, required: true },
});

module.exports = mongoose.model('College', collegeSchema);
