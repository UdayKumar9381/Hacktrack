import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CollegeLogin.css'; // Import the CSS file

const CollegeLogin = () => {
  const [formData, setFormData] = useState({
    collegeEmail: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/college/login', formData);
      alert(response.data.message);
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      navigate('/collegedashboard'); // Navigate to dashboard after successful login
    } catch (error) {
      alert(error.response?.data?.message || 'Wrong Password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">College Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              name="collegeEmail"
              placeholder="College Email"
              value={formData.collegeEmail}
              onChange={handleChange}
              required
            />
            <span className="input-border"></span>
          </div>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="input-border"></span>
            <span
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'} {/* Toggle icon */}
            </span>
          </div>
          <div className="options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember Me
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="signup-link">
          if you have does not account? contact with owner <a href=""></a>
        </p>
      </div>
    </div>
  );
};

export default CollegeLogin;