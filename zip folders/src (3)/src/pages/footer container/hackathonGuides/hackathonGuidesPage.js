import React from "react";
import "./hackathonGuidesPage.css";

const HackathonGuidesPage = () => {
  const guides = [
    { id: 1, label: "Getting Started", description: "A beginner's guide to hackathons." },
    { id: 2, label: "Building a Team", description: "Tips for forming and managing a team." },
    { id: 3, label: "Idea Generation", description: "How to come up with winning ideas." },
    { id: 4, label: "Effective Pitching", description: "Learn to pitch your idea effectively." },
    { id: 5, label: "Technical Preparation", description: "Preparing your tools and resources." },
    { id: 6, label: "Time Management", description: "Manage your time for success." },
    { id: 7, label: "Judging Criteria", description: "Understand what judges look for." },
  ];

  return (
    <div className="hackathon-guides-page">
      <h1>Hackathon Guides</h1>
      <div className="guides-container">
        {guides.map((guide) => (
          <div className="guide-card" key={guide.id}>
            <h2>{guide.label}</h2>
            <p>{guide.description}</p>
            <button>Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HackathonGuidesPage;
