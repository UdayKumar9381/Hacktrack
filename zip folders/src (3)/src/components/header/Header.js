import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Header.css';

function Header() {
  const [dropdown, setDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate(); // Initialize navigate for navigation

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle mobile menu
  };

  // Navigation functions
  const goToLogin = () => {
    navigate('/login');
  };

  const goToUserAccount = () => {
    navigate('/account');
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger-menu" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </button>
        {(menuOpen || window.innerWidth > 768) && ( // Show menu based on screen width or state
          <>
            <div className="menu-box" onClick={() => toggleDropdown('projects')}>
              Projects
              {dropdown === 'projects' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">Top Projects</div>
                  <div className="dropdown-item">Monthly Projects</div>
                </div>
              )}
            </div>
            <div className="menu-box" onClick={() => toggleDropdown('hackathons')}>
              Hackathons
              {dropdown === 'hackathons' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">Teams</div>
                  <div className="dropdown-item">Winners</div>
                  <div className="dropdown-item">Mentors</div>
                </div>
              )}
            </div>
            <div className="menu-box" onClick={() => toggleDropdown('coding')}>
              Coding
              {dropdown === 'coding' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">Live Contest</div>
                  <div className="dropdown-item">Previous Contests</div>
                  <div className="dropdown-item">Winners</div>
                  <div className="dropdown-item">Leaderboard</div>
                </div>
              )}
            </div>
            <div className="menu-box" onClick={() => toggleDropdown('resources')}>
              Resources
              {dropdown === 'resources' && (
                <div className="dropdown-menu">
                  <div className="dropdown-item">FAQs</div>
                  <div className="dropdown-item">Conduct and Policies</div>
                  <div className="dropdown-item">Prizes</div>
                  <div className="dropdown-item">Organizers</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="user-account" onClick={goToUserAccount}>User Account</div>
        <button className="login-btn" onClick={goToLogin}>Login</button>
      </div>
    </header>
  );
}

export default Header;
