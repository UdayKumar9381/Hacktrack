const cron = require('node-cron');
const CollegeHackathonHosting = require('../models/CollegeHackathonHosting');

// Function to update hackathon statuses
const updateHackathonStatuses = async () => {
    try {
        const now = new Date();
        console.log(`Running hackathon status update: ${now.toISOString()}`);
        
        // Update future hackathons to present if start date has passed
        await CollegeHackathonHosting.updateMany(
            { status: 'future', startDate: { $lte: now } },
            { status: 'present' }
        );
        
        // Find present hackathons that might need to be moved to past
        const presentHackathons = await CollegeHackathonHosting.find({ 
            status: 'present'
        });
        
        for (const hackathon of presentHackathons) {
            // Calculate end time based on end date or duration (whichever is later)
            const endTimeByEndDate = new Date(hackathon.endDate);
            
            // Calculate end time based on start date + duration
            const endTimeByDuration = new Date(hackathon.startDate);
            endTimeByDuration.setDate(endTimeByDuration.getDate() + hackathon.duration);
            
            // Use the later of the two end times
            const effectiveEndTime = new Date(Math.max(
                endTimeByEndDate.getTime(),
                endTimeByDuration.getTime()
            ));
            
            // If the effective end time has passed, update to past status
            if (now > effectiveEndTime) {
                hackathon.status = 'past';
                await hackathon.save();
                console.log(`Moved hackathon ${hackathon.name} to past status`);
            }
        }
        
        console.log('Hackathon status update completed');
    } catch (error) {
        console.error('Error updating hackathon statuses:', error);
    }
};

// Setup cron job to run every hour
const setupCronJobs = () => {
    // Run every hour at minute 0
    cron.schedule('0 * * * *', updateHackathonStatuses);
    console.log('Hackathon status update cron job scheduled');
    
    // Run once at startup
    updateHackathonStatuses();
};

module.exports = { setupCronJobs, updateHackathonStatuses };