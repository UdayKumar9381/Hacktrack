import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const [showHackathonOptions, setShowHackathonOptions] = useState(false);

  const toggleHackathonOptions = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    setShowHackathonOptions(!showHackathonOptions);
  };

  return (
    <div className="sidebar">
      <h2>College Dashboard</h2>
      <ul>
        <li><Link to="">Home</Link></li> 
        <li><Link to="host">Organisers Data</Link></li>
        <li>
          <a href="#" onClick={toggleHackathonOptions}>Certificates Generating</a>
          {showHackathonOptions && (
            <ul className="sub-options">
              <li><Link to="hackathon/Ongoing">Student Details</Link></li>
              <li><Link to="hackathon/CertificateList">Certificate Making</Link></li>
              <li><Link to="hackathon/certificate">Certificate Sample</Link></li>
              <li><Link to="hackathon/certificatedetails">Certificate Details</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="Scorecard">ScoreBoard</Link></li>
        <li><Link to="view-submissions">View Submissions</Link></li>
        <li><Link to="messages">Messages</Link></li> {/* ✅ Added Messages Option */}
      </ul>
    </div>
  );
};

export default Sidebar;
