const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema({
    profilePicture: { type: String, default: "" }, // Store URL of the image
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    collegeName: { type: String, required: true },
    branch: { type: String, required: true },
    dob: { type: Date, required: true },
    aboutYourself: { type: String, default: "" },
    linkedinLink: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
