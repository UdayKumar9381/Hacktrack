import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [collegeDetails, setCollegeDetails] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch college details
  useEffect(() => {
    const fetchCollegeDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging line
        if (!token) {
          navigate('/login');
          return;
        }
    
        const response = await axios.get('http://localhost:5002/api/college/details', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCollegeDetails(response.data);
      } catch (error) {
        console.error('Error fetching college details:', error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token'); // Clear invalid token
          navigate('/login'); // Redirect to login
        }
      }
    };

    fetchCollegeDetails();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Navigate to homepage
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img
          src="https://i.pinimg.com/474x/b2/83/5c/b2835cde6d6b15b87214c999d9752406.jpg"
          alt="Logo"
        />
      </div>
      <div className={`profile-dropdown ${isDropdownOpen ? "open" : ""}`} ref={dropdownRef}>
        <FaUserCircle
          className="navbar-icon"
          onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown on click
        />
        {isDropdownOpen && (
          <div className="dropdown-content">
            {collegeDetails ? (
              <>
                <div className="dropdown-item"><strong>College Name:</strong> {collegeDetails.collegeName}</div>
                <div className="dropdown-item"><strong>College Email:</strong> {collegeDetails.collegeEmail}</div>
                <div className="dropdown-item"><strong>College Phone:</strong> {collegeDetails.phoneNumber}</div>
                <div className="dropdown-item"><strong>College Code:</strong> {collegeDetails.collegeCode}</div>
              </>
            ) : (
              <div className="dropdown-item">Loading...</div>
            )}
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
