const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    filename: { 
        type: String, 
        required: true 
    },
    originalName: { 
        type: String, 
        required: true 
    },
    filePath: { 
        type: String, 
        required: true 
    },
    fileSize: { 
        type: Number, 
        required: true 
    },
    fileType: { 
        type: String, 
        required: true 
    },
    uploadDate: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model("Upload", UploadSchema);