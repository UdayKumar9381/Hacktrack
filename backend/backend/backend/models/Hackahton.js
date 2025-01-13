const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String, default: '' },  // default empty string
});

HackathonSchema.index({ name: 1, date: -1 });  // Example index on name and date for efficient search

module.exports = mongoose.model('Hackathon', HackathonSchema);
