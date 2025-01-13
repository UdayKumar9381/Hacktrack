import React, { useState } from 'react';
import './ExploreProjectsPage.css';

const ExploreProjectsPage = () => {
  const [projects] = useState([
    {
      title: 'AI-Powered Chatbot',
      description: 'A chatbot using NLP to provide intelligent responses.',
      link: '#',
    },
    {
      title: 'E-commerce Platform',
      description: 'A fully functional e-commerce platform with payment integration.',
      link: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React.',
      link: '#',
    },
    {
      title: 'Hackathon Tracker',
      description: 'A platform to track and participate in regional hackathons.',
      link: '#',
    },
  ]);

  return (
    <div className="explore-projects-page">
      <header>
        <h1>Explore Projects</h1>
        <p>Discover innovative projects created by our talented community!</p>
      </header>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} className="view-more">View More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProjectsPage;
