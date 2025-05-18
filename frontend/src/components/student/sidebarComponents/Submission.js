import React, { useState } from "react";
import { Send, AlertCircle } from "lucide-react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5002/api/hackathon";

const HackathonSubmissionForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    Name: "",
    email: "",
    organizationName: "",
    hackathonName: "",
    description: "",
    githubLink: "",
  });
  const [document, setDocument] = useState(null); // State for the uploaded file
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocument(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.projectTitle ||
      !formData.Name ||
      !formData.email ||
      !formData.organizationName ||
      !formData.hackathonName ||
      !formData.description ||
      !formData.githubLink ||
      !document
    ) {
      setError("Please fill in all required fields and upload a document.");
      setIsSubmitting(false);
      return;
    }

    // GitHub URL validation
    if (!formData.githubLink.startsWith("https://github.com/")) {
      setError("Please provide a valid GitHub repository URL.");
      setIsSubmitting(false);
      return;
    }

    // Prepare form data for file upload
    const data = new FormData();
    data.append("projectTitle", formData.projectTitle);
    data.append("Name", formData.Name);
    data.append("email", formData.email);
    data.append("organizationName", formData.organizationName);
    data.append("hackathonName", formData.hackathonName);
    data.append("description", formData.description);
    data.append("githubLink", formData.githubLink);
    data.append("document", document); // Append the file

    try {
      const response = await axios.post(`${API_BASE_URL}/submissions`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
        },
      });

      setSuccess("Project submitted successfully!");
      setFormData({
        projectTitle: "",
        Name: "",
        email: "",
        organizationName: "",
        hackathonName: "",
        description: "",
        githubLink: "",
      });
      setDocument(null); // Clear the file input
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submission-container">
      <div className="submission-form-wrapper">
        <div className="submission-illustration-container">
          {/* Illustration section */}
        </div>

        <div className="submission-form-container">
          <h2 className="submission-form-title">Hackathon Submission</h2>
          <form onSubmit={handleSubmit} className="submission-form">
            <input
              type="text"
              name="projectTitle"
              placeholder="Project Title"
              value={formData.projectTitle}
              onChange={handleChange}
              className="submission-input-field"
              required
            />
            <input
              type="text"
              name="Name"
              placeholder="Name"
              value={formData.Name}
              onChange={handleChange}
              className="submission-input-field"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="submission-input-field"
              required
            />
            <input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              value={formData.organizationName}
              onChange={handleChange}
              className="submission-input-field"
              required
            />
            <input
              type="text"
              name="hackathonName"
              placeholder="Hackathon Name"
              value={formData.hackathonName}
              onChange={handleChange}
              className="submission-input-field"
              required
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              className="submission-textarea-field"
              required
            />
            <input
              type="url"
              name="githubLink"
              placeholder="GitHub Repository Link"
              value={formData.githubLink}
              onChange={handleChange}
              className="submission-input-field"
              required
            />
            <input
              type="file"
              name="document"
              onChange={handleFileChange}
              className="submission-input-field"
              required
            />
            {error && (
              <div className="submission-error-container">
                <AlertCircle className="submission-icon" />
                <p className="submission-error-text">{error}</p>
              </div>
            )}
            {success && (
              <div className="submission-success-container">
                <p className="submission-success-text">{success}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="submission-button"
            >
              <Send className="submission-icon" />
              {isSubmitting ? "Submitting..." : "Submit Project"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .submission-container {
          min-height: 100vh;
          background: linear-gradient(to right, #667eea, #764ba2);
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submission-form-wrapper {
          width: 100%;
          max-width: 60rem;
          background-color: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          display: flex;
          overflow: hidden;
          transform: scale(0.95);
          transition: transform 0.3s ease-in-out;
        }

        .submission-form-wrapper:hover {
          transform: scale(1);
        }

        .submission-illustration-container {
          width: 40%;
          background: url('https://i.pinimg.com/736x/75/c6/a6/75c6a68a97637356f3cb52aac86d37e0.jpg') no-repeat center;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeInLeft 1s ease-in-out;
        }
          @keyframes fadeInLeft {
  from { 
    opacity: 0; 
    transform: translateX(-50px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
}

        .submission-form-container {
          width: 60%;
          padding: 2.5rem;
          animation: fadeInRight 1s ease-in-out;
        }

        .submission-form-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2d3748;
          text-align: center;
          margin-bottom: 1rem;
        }

        .submission-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .submission-input-field,
        .submission-textarea-field {
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          border: 2px solid #cbd5e0;
          outline: none;
          font-size: 1rem;
          transition: all 0.3s ease-in-out;
        }

        .submission-input-field:focus,
        .submission-textarea-field:focus {
          border-color: #667eea;
          box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        }

        .submission-textarea-field {
          min-height: 120px;
          resize: vertical;
        }

        .submission-button {
          width: 100%;
          background-color: #3b82f6;
          color: white;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 1.125rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .submission-button:hover {
          background-color: #2563eb;
          transform: scale(1.05);
        }

        .submission-button:disabled {
          background-color: #60a5fa;
          cursor: not-allowed;
        }

        .submission-icon {
          width: 1rem;
          height: 1rem;
        }

        .submission-error-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #dc2626;
          padding: 0.5rem;
          border-radius: 0.5rem;
          background-color: #fee2e2;
        }

        .submission-success-container {
          padding: 0.5rem;
          border-radius: 0.5rem;
          background-color: #dcfce7;
          color: #166534;
          text-align: center;
        }

        .submission-error-text,
        .submission-success-text {
          margin: 0;
          font-size: 0.875rem;
        }

        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 768px) {
          .submission-form-wrapper {
            flex-direction: column;
          }

          .submission-illustration-container {
            width: 100%;
            height: 200px;
          }

          .submission-form-container {
            width: 100%;
          }
        }
      `}</style>



    </div>
  );
};

export default HackathonSubmissionForm;