import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // React Router for navigation
import './WelcomeSection.css';

const MainSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigation

  const hackathons = [
    {
      title: "Ongoing Hackathon",
      description: "Register now to join the current hackathon and showcase your skills!",
      buttonText: "Explore",
      onClick: () => navigate('/ongoing') // Route for ongoing hackathon
    },
    {
      title: "Your Hackathon",
      description: "Get ready for our next hackathon event.Stay tuned",
      buttonText: "Register",
      onClick: () => navigate('/register') // Route for the registration page
    }
  ];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="ms-hero">
      {/* Background video */}
      <video autoPlay loop muted className="ms-bg-vid">
        <source 
          src="https://media.istockphoto.com/id/1403142645/video/global-network-and-technology-concept.mp4?s=mp4-640x640-is&k=20&c=o6Usg2Nu9wj49-kiGBzG1TXMn_LJNqPDcz6-5wfYtq0=" 
          type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="ms-overlay">
        {/* Left side with heading and about */}
        <div className="ms-left">
          <h1 className="ms-heading">HackTrack</h1>
          <p className="ms-desc">
            Welcome to HackTrack, where innovators and creators come together to tackle real-world challenges. Join us in a journey of creativity, collaboration, and coding excellence.
          </p>
        </div>

        {/* Right side with card section */}
        <div className="ms-right">
          <div className="ms-cards">
            {/* Hackathon Cards */}
            <div className="ms-slide" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {hackathons.map((hackathon, index) => (
                <div className="ms-card-content" key={index}>
                  <h2>{hackathon.title}</h2>
                  <p>{hackathon.description}</p>
                  {/* Attach the appropriate navigation for each button */}
                  <button className="ms-btn" onClick={hackathon.onClick}>
                    {hackathon.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Dots for navigation */}
          <div className="ms-dots">
            {hackathons.map((_, index) => (
              <span
                key={index}
                className={`ms-dot ${currentIndex === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
