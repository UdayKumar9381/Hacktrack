import React from "react";
import { useNavigate } from "react-router-dom";
import "./HostPage.css";

const HostPage = () => {
  const navigate = useNavigate();

  return (
    <div className="host-wrapper">
      <h1 className="host-heading">How to Host a Hackathon</h1>

      <div className="roadmap-section">
        <svg viewBox="0 0 800 290" className="roadmap-svg">
          <path d="M100,200 Q200,350 300,200 Q400,50 500,200 Q600,350 700,200"
            className="roadmap-path"
          />
          <path d="M100,200 Q200,350 300,200 Q400,50 500,200 Q600,350 700,200"
            className="roadmap-dashed"
          />
          
          <circle cx="100" cy="200" r="8" className="roadmap-point" />
          <text x="50" y="180" className="roadmap-label">
            <tspan x="50" dy="0">Step 1: Read</tspan>
            <tspan x="50" dy="1.2em">the custom</tspan>
            <tspan x="50" dy="1.2em">Instructions</tspan>
          </text>

          <circle cx="300" cy="200" r="8" className="roadmap-point" />
          <text x="320" y="220" className="roadmap-label">
            <tspan x="320" dy="0">Step 2: When</tspan>
            <tspan x="320" dy="1.2em">you host</tspan>
            <tspan x="320" dy="1.2em">a hackathon</tspan>
          </text>

          <circle cx="500" cy="200" r="8" className="roadmap-point" />
          <text x="520" y="180" className="roadmap-label">
            <tspan x="520" dy="0">Step 3: After</tspan>
            <tspan x="520" dy="1.2em">logging in,</tspan>
            <tspan x="520" dy="1.2em">get hosting</tspan>
          </text>

          <circle cx="700" cy="200" r="8" className="roadmap-point" />
          <text x="720" y="220" className="roadmap-label">
            <tspan x="720" dy="0">Step 4: Create</tspan>
            <tspan x="720" dy="1.2em">your hackathon</tspan>
            <tspan x="720" dy="1.2em">and submit</tspan>
          </text>
        </svg>
      </div>

      <h2 className="hosting-title">When to Host a Hackathon?</h2>

      <div className="hosting-section">
        <p className="hosting-description">
          Hosting a hackathon is a great way to engage tech enthusiasts, encourage innovation, and solve real-world problems.
        </p>
        <button className="hosting-button" onClick={() => navigate("/organiserlogin")}>
          Host Hackathon
        </button>
      </div>
    </div>
  );
};

export default HostPage; 
