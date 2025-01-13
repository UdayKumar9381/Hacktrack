const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Registration' }], // References Registration schema
  maxSize: { type: Number, default: 10 }
});

module.exports = mongoose.model('Team', teamSchema);
