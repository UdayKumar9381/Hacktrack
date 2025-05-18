import React, { useState } from "react";
import Axios from "axios";
import "./HackathonRegister.css"; // Import the CSS file for styling

const HackathonRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    collegeName: "",
    hackathonName: "",
    yearOfStudy: "",
    branch: "",
    organisation: "", // Ensure this field exists
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.hackathonName) {
      alert("Please enter a Hackathon Name");
      return;
    }

    try {
      const response = await Axios.post("http://localhost:5002/api/registration/register", formData);
      setRegistrationSuccess(true); // Set success state to true
      console.log(response);
      setFormData({
        name: "",
        email: "",
        studentId: "",
        collegeName: "",
        hackathonName: "",
        yearOfStudy: "",
        branch: "",
        organisation: "",
        date: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response) {
        alert(`Registration failed: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        alert("No response from server. Check your network or server status.");
      } else {
        alert(`Request error: ${error.message}`);
      }
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Hackathon Registration</h2>
      {registrationSuccess && (
        <div className="success-message">
          <p>Registration successful! Check your email for confirmation.</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">College Name:</label>
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hackathon Name:</label>
          <input
            type="text"
            name="hackathonName"
            value={formData.hackathonName}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Year of Study:</label>
          <select
            name="yearOfStudy"
            value={formData.yearOfStudy}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select Year</option>
            <option value="Btech 1st year">Btech 1st year</option>
            <option value="Btech 2nd year">Btech 2nd year</option>
            <option value="Btech 3rd year">Btech 3rd year</option>
            <option value="Btech 4th year">Btech 4th year</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Branch:</label>
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Organisation:</label>
          <input
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hackathon Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default HackathonRegister;