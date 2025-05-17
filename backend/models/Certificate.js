const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  course: { type: String, required: true },
  hackathonName: { type: String, default: "" },
  template: { type: String, default: "template1" }, // Add this line
  date: { type: Date, default: Date.now }, // Optional: Add a date field
});

module.exports = mongoose.model("Certificate", certificateSchema);