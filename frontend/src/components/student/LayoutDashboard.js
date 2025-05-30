import React, { useState } from "react"; // Added useState import
import { Outlet } from "react-router-dom"; // Removed unused useLocation
import Sidebar from "./Sidebar";
import StudentHeader from "./StudentHeader"; // Changed import to match file name
import "./LayoutDashboard.css";

const LayoutDashboard = () => {
  const [profilePicture] = useState("https://via.placeholder.com/150"); // Removed unused setProfilePicture

  return (
    <div className="dashboard-layout">
      <StudentHeader profilePicture={profilePicture} />
      <div className="dashboard-main">
        <Sidebar />
        <div className="dashboard-content">
          <Outlet />
        </div> 
      </div>
    </div>
  );
};

export default LayoutDashboard;