const mongoose = require('mongoose');

const CollegeHackathonHostingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },  // URL for uploaded image
    startDate: { type: Date, required: true }, // Stores both date & time
    endDate: { type: Date, required: true },   // Stores both date & time
    location: { type: String, required: true },
    collegeName: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['future', 'present', 'past'],
        default: 'future' 
    },
    duration: { 
        type: Number, 
        default: 3,  
        min: 1 
    }
});

// Pre-save hook to set initial status based on dates
CollegeHackathonHostingSchema.pre('save', function(next) {
    const now = new Date();
    if (this.startDate > now) {
        this.status = 'future';
    } else if (this.endDate < now) {
        this.status = 'past';
    } else {
        this.status = 'present';
    }
    next();
});

module.exports = mongoose.model('CollegeHackathonHosting', CollegeHackathonHostingSchema);
