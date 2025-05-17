const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Submission = require("../models/Submission");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in the `uploads` folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and DOC files are allowed"), false);
    }
  },
});


// Create a new submission with file upload
router.post("/submissions", upload.single("document"), async (req, res) => {
  try {
    const submissionData = {
      ...req.body,
      document: req.file.filename, // Store the uploaded document filename
    };

    const submission = new Submission(submissionData);
    await submission.save();

    res.status(201).json({
      success: true,
      data: submission,
      message: "Hackathon project submitted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }
});

// Get all submissions
router.get("/submissions", async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching submissions",
    });
  }
});

// Serve uploaded files statically
router.get("/uploads/:filename", (req, res) => {
  const file = path.join(__dirname, "../uploads", req.params.filename);
  res.download(file); // Forces file download instead of opening in browser
});


module.exports = router;
