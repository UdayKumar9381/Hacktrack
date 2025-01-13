import React from "react";
import "./host_hackathon.css";

const HostHackathon = () => {
  return (
    <div className="host-hackathon">
      <header className="host-header">
        <h1>Host a Hackathon</h1>
        <p>
          A complete guide to organizing and managing a successful hackathon event.
        </p>
      </header>

      <section className="steps-section">
        <h2>How It Works</h2>
        <ol className="steps-list">
          <li>
            <h3>Plan Your Hackathon</h3>
            <p>
              Define the goals, set a timeline, and choose themes or challenges
              for participants.
            </p>
          </li>
          <li>
            <h3>Set Up Your Page</h3>
            <p>
              Use this platform to create event pages, register participants,
              and manage communication.
            </p>
          </li>
          <li>
            <h3>Promote Your Event</h3>
            <p>
              Share your hackathon page with your audience via social media,
              email, and other channels.
            </p>
          </li>
          <li>
            <h3>Run the Hackathon</h3>
            <p>
              Provide real-time updates, facilitate collaboration, and monitor
              progress during the event.
            </p>
          </li>
          <li>
            <h3>Conclude and Celebrate</h3>
            <p>
              Announce winners, showcase projects, and gather feedback for
              future events.
            </p>
          </li>
        </ol>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul className="features-list">
          <li>Easy registration and participant management.</li>
          <li>Customizable event page templates.</li>
          <li>Real-time announcements and notifications.</li>
          <li>Collaboration tools for participants.</li>
          <li>Post-event analytics and feedback collection.</li>
        </ul>
      </section>

      <footer className="host-footer">
        <p>Ready to host your hackathon? Start now and make it a success!</p>
        <button className="cta-button">Get Started</button>
      </footer>
    </div>
  );
};

export default HostHackathon;
