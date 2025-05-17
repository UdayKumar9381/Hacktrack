const mongoose = require('mongoose');

const Hoster_homepage = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  college: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Hoster_homepage', Hoster_homepage);
