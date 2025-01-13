import React from 'react';
import './OngoingHackathonPage.css'; // Optional for styling

function OngoingHackathonPage() {
  return (
    <div className="ongoing-hackathon-page">
      <h1>Ongoing Hackathon</h1>
      <p>We are excited to announce our ongoing hackathon! Join now and showcase your skills.</p>
      
      <div className="hackathon-details">
        <h2>Event Details</h2>
        <ul>
          <li><strong>Theme:</strong> Innovation in Technology</li>
          <li><strong>Start Date:</strong> January 10, 2024</li>
          <li><strong>End Date:</strong> January 20, 2024</li>
          <li><strong>Location:</strong> Virtual</li>
          <li><strong>Prizes:</strong> Cash prizes, Internship opportunities, and more!</li>
        </ul>
        
        <h3>How to Participate:</h3>
        <p>
          1. Register by clicking the "Apply Now" button below.<br />
          2. Form teams and start brainstorming innovative ideas.<br />
          3. Submit your project by the end date to win exciting prizes!
        </p>
      </div>
    </div>
  );
}

export default OngoingHackathonPage;
