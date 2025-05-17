const express = require("express");
const StudentProfile = require("../models/StudentProfile");

const router = express.Router();

// 📌 1. Create or Update Profile (if email exists, update it)
router.post("/update", async (req, res) => {
    try {
        const { email, ...profileData } = req.body;

        const updatedProfile = await StudentProfile.findOneAndUpdate(
            { email },
            profileData,
            { new: true, upsert: true } // Create if not exists
        );

        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 2. Get Profile by Email
// Get student profile by email
router.get('/studentProfile/:email', async (req, res) => {
    try {
        const user = await StudentProfile.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ message: "Server error" });
    }
});



// 📌 3. Delete Profile by Email
router.delete("/:email", async (req, res) => {
    try {
        const deletedProfile = await StudentProfile.findOneAndDelete({ email: req.params.email });

        if (!deletedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
