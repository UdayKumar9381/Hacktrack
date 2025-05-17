const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    collegeName: { type: String },
    collegeCode: { type: String, }, // Add this field
    studentId: { type: String, unique: true },
    branch: { type: String, required: true },
    dob: { type: Date, required: true },
    linkedin: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    otp: { type: String, minlength: 6, maxlength: 6, match: /^\d+$/ },
    otpExpires: { type: Date, index: { expires: '10m' } } },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
