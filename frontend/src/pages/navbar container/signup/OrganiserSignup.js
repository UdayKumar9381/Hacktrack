import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./organisersignup.css";

const OrganiserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "", // ✅ Corrected field name
    password: "",
    confirmPassword: "",
  });
  

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5002/api/hoster/signup", {  // Change "organiser" to "hoster"
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });      

      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Please login.");
        navigate("/organiserlogin");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="organiser-container">
      <h2>Organiser Signup</h2>
      <form onSubmit={handleSignup}>
  <div className="organiser-field">
    <label>Name</label>
    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
  </div>

  <div className="organiser-field">
    <label>Email</label>
    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
  </div>

  <div className="organiser-field">
    <label>Phone</label>
    <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
  </div>

  <div className="organiser-field">
    <label>Organisation Name</label>
    <input type="text" name="college" value={formData.college} onChange={handleChange} required />
  </div>

  <div className="organiser-field">
    <label>Password</label>
    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
  </div>

  <div className="organiser-field">
    <label>Confirm Password</label>
    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
  </div>

  <button type="submit">Signup</button>
</form>


      <p>Already have an account? <span className="organiser-login-link" onClick={() => navigate("/organiserlogin")}>Login here</span></p>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default OrganiserSignup;
