// LoginPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Ensure your CSS file is imported

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLoginAsStudent = () => {
    navigate('/studentlogin'); // Directs to student login
  };

  const handleLoginAsAdmin = () => {
    navigate('/CollegeLogin'); // Directs to admin login
  };

  const handleLoginAsCollege = () => {
    navigate('/organiserlogin'); // Directs to college login
  };

  useEffect(() => {
    // Trigger bubble animation immediately when the page is loaded
    setTimeout(() => {
      document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.classList.add('animate'); // Starts bubble animation right away
      });
    }, 0); // Animation starts immediately without delay
  }, []);

  return (
    <div className="login-page-container">
      {/* Add 10 bubbles */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className={`bubble bubble${i + 1}`}></div>
      ))}

      {/* Login options container */}
      <div className="login-options-container">
        <h2>Select Your Login Option</h2>
        <div className="login-options">
          <button className="login-option-btn" onClick={handleLoginAsStudent}>
            Login as Student
          </button>
          <button className="login-option-btn" onClick={handleLoginAsAdmin}>
            Login as Admin/College
          </button>
          <button className="login-option-btn" onClick={handleLoginAsCollege}>
            Login as Orgainizer
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 
