const mongoose = require('mongoose');

// Define the scorecard schema
const scorecardSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Registration', required: true },
  name: { type: String, required: true },
  rollno: { type: String, required: true },
  email: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  branch: { type: String, required: true },
  hackathonName: { type: String, required: true },
  collegeName: { type: String, required: true },
  organisation: { type: String, required: true },
  score: { type: Number, default: null },
  evaluatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Scorecard = mongoose.model('Scorecard', scorecardSchema);

module.exports = Scorecard;