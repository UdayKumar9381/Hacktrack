const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['present', 'future', 'past'], required: true }
});

module.exports = mongoose.model('Hackathon', HackathonSchema);
