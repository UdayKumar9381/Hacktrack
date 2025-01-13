const express = require('express');
const Team = require('../models/team');
const Registration = require('../models/registration');

const router = express.Router();

// Create a new team
router.post('/create-team', async (req, res) => {
    const { teamName, members } = req.body;

    if (members.length > 10) {
        return res.status(400).json({ status: 'Failed', message: 'A team cannot have more than 10 members' });
    }

    try {
        const team = new Team({ teamName, members });
        await team.save();
        res.status(201).json({ status: 'Success', data: team });
    } catch (err) {
        res.status(500).json({ status: 'Failed', message: err.message });
    }
});

// Add a participant to an existing team
router.post('/add-to-team', async (req, res) => {
    const { participantId, teamId } = req.body;

    console.log("Participant ID:", participantId);
    console.log("Team ID:", teamId);

    if (!teamId || !participantId) {
        return res.status(400).json({ status: 'Failed', message: 'Team ID and Participant ID are required' });
    }

    try {
        const team = await Team.findById(teamId);

        if (!team) {
            return res.status(404).json({ status: 'Failed', message: 'Team not found' });
        }

        if (team.members.includes(participantId)) {
            return res.status(400).json({ status: 'Failed', message: 'Participant is already a member of the team' });
        }

        if (team.members.length >= 10) {
            return res.status(400).json({ status: 'Failed', message: 'Team is already full!' });
        }

        team.members.push(participantId);
        await team.save();

        res.status(200).json({ status: 'Success', data: team });
    } catch (err) {
        console.error('Error during add-to-team:', err);
        res.status(500).json({ status: 'Failed', message: err.message });
    }
});


module.exports = router;
