import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaCertificate, FaUpload, FaTrophy, FaUsers, FaClipboardList } from "react-icons/fa";
import "./Sidebar.css"; // New separate CSS file

const Sidebar = () => {
  return (
    <aside className="dashboard-sidebar">
      <h2 className="sidebar-logo">Hack_Tr@ck</h2>
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/studentdashboard" end>
            <FaHome className="sidebar-icon" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/studentdashboard/certifications">
            <FaCertificate className="sidebar-icon" /> Certifications
          </NavLink>
        </li>
        <li>
          <NavLink to="/studentdashboard/submission">
            <FaUpload className="sidebar-icon" /> Submission
          </NavLink>
        </li>
        <li>
          <NavLink to="/studentdashboard/participations">
            <FaUsers className="sidebar-icon" /> Participations
          </NavLink>
        </li>
        <li>
          <NavLink to="/studentdashboard/Leaderboard">
            <FaTrophy className="sidebar-icon" /> Scoreboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/studentdashboard/HackathonRegister">
            <FaClipboardList className="sidebar-icon" /> Hackathon Register
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;