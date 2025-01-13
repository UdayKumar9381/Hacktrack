const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollno: { type: String, required: true, unique: true },
    yearOfStudy: {
        type: String,
        required: true,
        enum: ['Btech 1st year', 'Btech 2nd year', 'Btech 3rd year', 'Btech 4th year']
    },
    branch: { type: String, required: true },
    email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
