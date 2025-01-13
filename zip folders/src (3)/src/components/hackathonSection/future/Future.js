import React, { useState } from 'react';
import './Future.css';

const hackathons = [
  {
    title: 'Devmatch',
    theme: ['BLOCKCHAIN', 'DESIGN', 'AI/ML'],
    poster: '2025hack.jpg',
    startTime: '2025-02-06T17:00:00',
  },
  {
    title: 'ETH SEA',
    theme: ['MACHINE LEARNING', 'FINTECH'],
    poster: '2025hack.jpg',
    startTime: '2025-01-24T19:00:00',
  },
  {
    title: 'AI Revolution',
    theme: ['AI/ML', 'AUTOMATION'],
    poster: '2025hack.jpg',
    startTime: '2025-01-15T10:00:00',
  },
  {
    title: 'Code Sprint',
    theme: ['SOFTWARE', 'CYBERSECURITY'],
    poster: '2025hack.jpg',
    startTime: '2025-02-19T10:00:00',
  },
  {
    title: 'Blockchain Bonanza',
    theme: ['BLOCKCHAIN', 'DEFI'],
    poster: '2025hack.jpg',
    startTime: '2025-01-15T10:00:00',
  },
  {
    title: 'Hack The Future',
    theme: ['AI', 'BLOCKCHAIN'],
    poster: '2025hack.jpg',
    startTime: '2025-01-12T10:00:00',
  },
];

// Utility function to generate random start dates
const generateRandomDate = () => {
  const now = new Date();
  const futureDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + Math.floor(Math.random() * 30) + 1, // Random date within 30 days
    Math.floor(Math.random() * 24), // Random hour
    Math.floor(Math.random() * 60) // Random minute
  );
  return futureDate.toISOString();
};

function HackathonList({ title, events }) {
  const [countdowns, setCountdowns] = useState({});

  const handleApplyClick = (index, startTime) => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const start = new Date(startTime);
      const timeDiff = start - now;

      if (timeDiff <= 0) {
        clearInterval(intervalId);
        setCountdowns((prev) => ({
          ...prev,
          [index]: 'Hackathon has started!',
        }));
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setCountdowns((prev) => ({
        ...prev,
        [index]: `${days}d ${hours}h ${minutes}m ${seconds}s remaining`,
      }));
    }, 1000);

    // Clear interval when unmounted
    return () => clearInterval(intervalId);
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="cards">
        {events.map((event, index) => {
          const startTime = generateRandomDate();
          return (
            <div key={index} className="card">
              {/* Poster Section */}
              <div className="card-header">
                <img src={event.poster} alt={`${event.title} poster`} className="poster" />
              </div>

              {/* Theme Section */}
              <div className="themes">
                <p className="theme-title">THEME</p>
                {event.theme.map((item, idx) => (
                  <span key={idx} className="theme-badge">
                    {item}
                  </span>
                ))}
              </div>

              {/* Apply Button */}
              <button
                className="apply-button"
                onClick={() => handleApplyClick(index, startTime)}
              >
                Apply Now
              </button>

              {/* Countdown Display */}
              <div className="countdown">{countdowns[index]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Future() {
  return (
    <div>
      <HackathonList title="Future Hackathons" events={hackathons} />
    </div>
  );
}

export default Future;
