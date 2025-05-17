const express = require("express");
const Certificate = require("../models/Certificate");
const router = express.Router();

// ✅ Create Certificate
router.post("/create", async (req, res) => {
  try {
    const { studentId, studentName, course, hackathonName, template } = req.body; // Add `template` here
    const newCertificate = new Certificate({ 
      studentId, 
      studentName, 
      course, 
      hackathonName, 
      template // Include the template field
    });
    await newCertificate.save();
    res.json({ message: "Certificate Created Successfully", certificate: newCertificate });
  } catch (error) {
    res.status(500).json({ message: "Error creating certificate", error });
  }
});

// ✅ Get All Certificates
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching certificates", error });
  }
});

module.exports = router;
