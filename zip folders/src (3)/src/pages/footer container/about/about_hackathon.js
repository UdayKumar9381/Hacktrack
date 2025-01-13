import React from 'react';
import './about_hackathon.css';

function AboutHackathon() {
  return (
    <div className="about-hackathon">
      <div className="about-header">
        <h1>About the Hackathon</h1>
        <p>Your guide to understanding what a hackathon is all about.</p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2>What is a Hackathon?</h2>
          <p>
            A hackathon is an event where programmers, designers, and other
            professionals come together to solve problems, create prototypes,
            and innovate collaboratively. It’s a great opportunity to learn,
            network, and showcase your skills.
          </p>
        </section>
        <section className="about-section">
          <h2>Purpose of the Hackathon</h2>
          <p>
            Hackathons aim to encourage creativity and teamwork while solving
            real-world challenges. They often result in innovative solutions,
            applications, and products that can make a positive impact.
          </p>
        </section>
        <section className="about-section">
          <h2>Who Can Participate?</h2>
          <p>
            Hackathons are open to students, professionals, and anyone with a
            passion for technology and problem-solving. Teams are formed to
            collaborate and compete for prizes and recognition.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutHackathon;
