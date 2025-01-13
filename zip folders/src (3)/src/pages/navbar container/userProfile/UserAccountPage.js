import React, { useState, useEffect } from "react";
import "./UserProfile.css";

const UserProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    // Fetch user details from backend
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUserDetails(data);
        calculateCompletion(data); // Calculate completion percentage
      });

    // Fetch hackathon participation details
    fetch("/api/user/hackathons")
      .then((res) => res.json())
      .then((data) => setHackathons(data));
  }, []);

  const calculateCompletion = (details) => {
    const totalFields = 6; // Adjust based on your form fields
    let filledFields = 0;
    if (details.name) filledFields++;
    if (details.email) filledFields++;
    if (details.phone) filledFields++;
    if (details.address) filledFields++;
    if (details.skills) filledFields++;
    if (details.resume) filledFields++;
    const percentage = (filledFields / totalFields) * 100;
    setProfileCompletion(percentage);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img
          src={userDetails.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-picture"
        />
        <h2>{userDetails.name || "User Name"}</h2>
        <p>{userDetails.role || "Hackathon Enthusiast"}</p>
      </div>

      <div className="profile-completion">
        <h3>Profile Completion: {Math.round(profileCompletion)}%</h3>
        <progress value={profileCompletion} max="100"></progress>
      </div>

      <div className="user-details">
        <h3>User Details</h3>
        <p><strong>Email:</strong> {userDetails.email || "Not Provided"}</p>
        <p><strong>Phone:</strong> {userDetails.phone || "Not Provided"}</p>
        <p><strong>Address:</strong> {userDetails.address || "Not Provided"}</p>
        <p><strong>Skills:</strong> {userDetails.skills || "Not Provided"}</p>
        <p><strong>Resume:</strong> {userDetails.resume ? "Uploaded" : "Not Uploaded"}</p>
        <button className="edit-btn">Edit Profile</button>
      </div>

      <div className="hackathon-participation">
        <h3>Hackathon Participation</h3>
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <div key={hackathon.id} className="hackathon-card">
              <h4>{hackathon.name}</h4>
              <p>Date: {hackathon.date}</p>
              <p>Status: {hackathon.status}</p>
              <p>Submission: {hackathon.submission || "No Submission Yet"}</p>
            </div>
          ))
        ) : (
          <p>No hackathon participation details available.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
