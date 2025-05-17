const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Upload = require("../../backend/models/CertificateUpload");

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Create unique filename with original extension
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

// Create upload middleware
const uploadMiddleware = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// File upload route
router.post("/upload", (req, res) => {
    uploadMiddleware.single("file")(req, res, async (err) => {
        if (err) {
            console.error("Upload error:", err);
            return res.status(500).json({ error: "File upload failed", details: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        try {
            const { userId } = req.body;
            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }
            const newUpload = new Upload({
                userId: userId,
                filename: req.file.filename,
                originalName: req.file.originalname,
                filePath: req.file.path,
                fileSize: req.file.size,
                fileType: req.file.mimetype
            });
            await newUpload.save();
            res.status(201).json({
                message: "File uploaded successfully",
                file: {
                    filename: req.file.filename,
                    originalName: req.file.originalname,
                    size: req.file.size,
                    type: req.file.mimetype
                }
            });
        } catch (error) {
            console.error("Database error:", error);
            res.status(500).json({ error: "File upload failed", details: error.message });
        }
    });
});



// Route to get file information by userId
// Backend route to get files by userId
router.get("/files/:userId", async (req, res) => {
    try {
        const files = await Upload.find({ userId: req.params.userId });
        res.json(files);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve files" });
    }
});

// Route to download a file
router.get("/download/:filename", (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: "File not found" });
    }
});

module.exports = router;