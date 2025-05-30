import React from 'react';
import './about_hackathon.css';

function AboutHackathon() {
  return (
    <div className="about-hackathon">
      <div className="about-header">
        <h1>About HackTrack</h1>
        <p>The all-in-one platform to organize, host, and participate in impactful hackathons.</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>What is HackTrack?</h2>
          <p>
            HackTrack is a centralized platform that empowers students and colleges to host, join,
            and manage hackathons with ease. Whether you're a first-time hacker or a seasoned
            organizer, HackTrack provides the tools you need to innovate and grow.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose HackTrack?</h2>
          <p>
            From registration to certification, HackTrack streamlines every part of the hackathon
            lifecycle. With features like student dashboards, real-time milestone tracking, and
            certification generation, HackTrack enhances engagement and simplifies logistics.
          </p>
        </section>

        <section className="about-section">
          <h2>Who Can Use HackTrack?</h2>
          <p>
            <strong>Students:</strong> Discover new hackathons, submit projects, earn certificates.<br />
            <strong>Colleges:</strong> Host official hackathons, manage participants, and track performance.<br />
            <strong>Organizers:</strong> Create impactful events with built-in management tools and analytics.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            HackTrack’s mission is to democratize innovation by making hackathons accessible,
            efficient, and rewarding for everyone involved. We believe in building a strong
            ecosystem of creators, problem solvers, and tech leaders.
          </p>
        </section>
      </div>
    </div>
  );
}

export default AboutHackathon;
 