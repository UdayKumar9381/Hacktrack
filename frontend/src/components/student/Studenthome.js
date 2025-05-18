import React from "react";
import "./Studenthome.css"; // New separate CSS file

const Studenthome = () => {
  return (
    <div className="team-members-container">
      <h1 className="dashboard-title">Welcome to Your Student Dashboard</h1>
      <div className="dashboard-content">
        <div className="welcome-message">
          <p>Hello, Innovator! 🚀</p>
          <p>
            Welcome to your hackathon hub. Here, you can explore upcoming
            hackathons, track your progress, and showcase your skills to the
            world.
          </p>
        </div>

        <div className="hackathon-info">
          <h2>What is a Hackathon?</h2>
          <p>
            A hackathon is an event where programmers, designers, and innovators
            come together to solve real-world problems, build projects, and
            compete for prizes. It's a great way to learn, network, and have fun!
          </p>
        </div>

        <div className="motivational-quote">
          <blockquote>
            "The only way to do great work is to love what you do." – Steve Jobs
          </blockquote>
        </div>

        <div className="call-to-action">
          <h2>Ready to Join a Hackathon?</h2>
          <p>
            Check out the upcoming hackathons and register now to start your
            journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Studenthome;