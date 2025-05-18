import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentHeader.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  
  const handleProfileClick = () => {
    navigate("/studentdashboard/profile");
    setDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <header className="dashboard-header">
      <h2>Student Dashboard</h2>
      <div className="profile-wrapper">
        <div className="profile-icon" onClick={toggleDropdown}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png"
            alt="Profile"
          />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li onClick={handleProfileClick}>My Profile</li>
              <li onClick={handleLogoutClick}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;