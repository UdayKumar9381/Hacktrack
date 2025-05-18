import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CollegeSignup.css';

const CollegeSignup = () => {
  const [formData, setFormData] = useState({
    collegeName: '',
    collegeEmail: '',
    phoneNumber: '',
    collegeCode: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/college/signup', formData);
      alert(response.data.message);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      alert(error.response?.data?.message || 'Error registering college');
    }
  };

  return (
    <div className="college-signup-container">
      <h2>College Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          value={formData.collegeName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="collegeEmail"
          placeholder="College Email"
          value={formData.collegeEmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="collegeCode"
          placeholder="College Code"
          value={formData.collegeCode}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>

      <p className="login-text">
        Already have an account?{' '}
        <button className="login-link" onClick={() => navigate('/CollegeLogin')}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default CollegeSignup;