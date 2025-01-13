import React, { useState } from 'react';
import "./RegisterPage.css";

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    fullName: '',
    occupation: '',
    personalDetails: '',
    hackathonDetails: '',
    phoneNumber: '',
    year: '',
    email: '',
    village: '',
    mandal: '',
    district: '',
    dateOfBirth: '',
    college: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const user = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      full_name: formData.fullName,
      occupation: formData.occupation,
      personal_details: formData.personalDetails,
      hackathon_details: formData.hackathonDetails,
      phone_number: formData.phoneNumber,
      year: formData.year,
      email: formData.email,
      village: formData.village,
      mandal: formData.mandal,
      district: formData.district,
      date_of_birth: formData.dateOfBirth,
      college: formData.college,
      password: formData.password,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('User registered successfully');
      } else {
        setMessage(data.detail || 'Registration failed');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Hackathon Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        {/* Age */}
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />

        {/* Gender */}
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Phone Number */}
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

        {/* Year */}
        <label htmlFor="year">Year:</label>
        <select id="year" name="year" value={formData.year} onChange={handleChange} required>
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>

        {/* Email */}
        <label htmlFor="email">Email ID:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        {/* Full Name */}
        <label htmlFor="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />

        {/* Occupation */}
        <label htmlFor="occupation">Occupation:</label>
        <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} required />

        {/* Address */}
        <label htmlFor="village">Village:</label>
        <input type="text" id="village" name="village" value={formData.village} onChange={handleChange} required />

        <label htmlFor="mandal">Mandal:</label>
        <input type="text" id="mandal" name="mandal" value={formData.mandal} onChange={handleChange} required />

        <label htmlFor="district">District:</label>
        <input type="text" id="district" name="district" value={formData.district} onChange={handleChange} required />

        {/* Date of Birth */}
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

        {/* College */}
        <label htmlFor="college">College:</label>
        <input type="text" id="college" name="college" value={formData.college} onChange={handleChange} required />

        {/* Personal Details */}
        <label htmlFor="personalDetails">Personal Details:</label>
        <textarea id="personalDetails" name="personalDetails" value={formData.personalDetails} onChange={handleChange} required />

        {/* Hackathon Details */}
        <label htmlFor="hackathonDetails">Hackathon Details:</label>
        <textarea id="hackathonDetails" name="hackathonDetails" value={formData.hackathonDetails} onChange={handleChange} required />

        {/* Password */}
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        {/* Confirm Password */}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;
