const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  otp: String,
  otpExpires: Date
});

module.exports = mongoose.model('User', userSchema);