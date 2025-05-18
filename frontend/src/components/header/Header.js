import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isStudentLoggedIn');
    setIsStudentLoggedIn(!!loggedIn);
  }, []);

  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDropdown(false);
    setMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header">
      {/* Logo */}
      <div className="left-side">
        <img
          src="https://i.pinimg.com/736x/1d/74/3b/1d743bb41490128be1b2a0edc8a3e000.jpg"
          alt="Logo"
          className="logo"
          onClick={() => handleNavigation('/')}
        />
      </div>

      {/* Desktop Navigation */}
      <div className="header-right">
        {/* Hackathons Dropdown - Wrapped in container */}
        <div className="dropdown-container">
          <div 
            className="menu-item hackathons-btn" 
            onClick={toggleDropdown}
          >
            Hackathons
          </div>
          {dropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleNavigation('/present')}>Present</div>
              <div className="dropdown-item" onClick={() => handleNavigation('/past')}>Past</div>
              <div className="dropdown-item" onClick={() => handleNavigation('/future')}>Future</div>
            </div>
          )}
        </div>

        {/* Resources Button */}
        <button 
          className="menu-item resources-btn"
          onClick={() => handleNavigation('/resource')}
        >
          Resources
        </button>

        <button onClick={() => handleNavigation('/HostPage')} className="host-btn">+Host</button>

        {/* Profile or Login */}
        {isStudentLoggedIn ? (
          <img
            src="/path-to-profile-pic.jpg"
            alt="Profile"
            className="profile-pic"
            onClick={() => handleNavigation('/studentdashboard')}
          />
        ) : (
          <button onClick={() => handleNavigation('/Login')} className="login-btn">Login</button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-item" onClick={toggleDropdown}>Hackathons ▼</div>
          {dropdown && (
            <div className="mobile-dropdown">
              <div className="dropdown-item" onClick={() => handleNavigation('/present')}>Present</div>
              <div className="dropdown-item" onClick={() => handleNavigation('/past')}>Past</div>
              <div className="dropdown-item" onClick={() => handleNavigation('/future')}>Future</div>
            </div>
          )}
          <div className="mobile-menu-item" onClick={() => handleNavigation('/resource')}>Resources</div>
          <div className="mobile-menu-item" onClick={() => handleNavigation('/HostPage')}>+Host</div>
          <div className="mobile-menu-item" onClick={() => handleNavigation('/Login')}>Login</div>
        </div>
      )}
    </div>
  );
}

export default Header;