const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: [true, "Project title is required"],
    trim: true,
    maxLength: [100, "Project title cannot exceed 100 characters"],
  },
  Name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxLength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address",
    ],
  },
  organizationName: {
    type: String,
    required: [true, "Organization name is required"],
    trim: true,
    maxLength: [100, "Organization name cannot exceed 100 characters"],
  },
  hackathonName: {
    type: String,
    required: [true, "Hackathon name is required"],
    trim: true,
    maxLength: [100, "Hackathon name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
    trim: true,
    maxLength: [1000, "Description cannot exceed 1000 characters"],
  },
  githubLink: {
    type: String,
    required: [true, "GitHub repository link is required"],
    validate: {
      validator: function (v) {
        return /^https?:\/\/github\.com\/.*/.test(v);
      },
      message: "Please provide a valid GitHub repository URL",
    },
  },
  document: {
    type: String, // Stores the filename of the uploaded document
    required: [true, "Project document is required"],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("Submission", submissionSchema);
