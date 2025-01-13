import React from 'react';
import './Past.css';

const hackathons = [
  {
    id: 'devmatch-2024',
    title: 'Devmatch',
    participants: '500+',
    poster: 'pastposter.jpg',
  },
  {
    id: 'eth-sea-2024',
    title: 'ETH SEA',
    participants: '500+',
    poster: 'pastposter.jpg',
  },
  {
    id: 'ai-revolution-2024',
    title: 'AI Revolution',
    participants: '300+',
    poster: 'pastposter.jpg',
  },
  {
    id: 'code-sprint-2024',
    title: 'Code Sprint',
    participants: '200+',
    poster: 'pastposter.jpg',
  },
  {
    id: 'blockchain-bonanza-2024',
    title: 'Blockchain Bonanza',
    participants: '400+',
    poster: 'pastposter.jpg',
  },
  {
    id: 'hack-future-2024',
    title: 'Hack The Future',
    participants: '600+',
    poster: 'pastposter.jpg',
  },
];

function HackathonCard({ title, participants, poster }) {
  const handleViewProjects = () => {
    // Add your view projects logic here
    console.log(`Viewing projects for ${title}`);
  };

  return (
    <article className="hackathon-card">
      <div 
        className="hackathon-poster" 
        style={{ backgroundImage: `url(${poster})` }}
        role="img"
        aria-label={`Poster for ${title} hackathon`}
      />
      <div className="hackathon-content">
        <h3 className="hackathon-title">{title}</h3>
        <p className="hackathon-participants">
          <span role="img" aria-label="participants">👥</span>{' '}
          {participants} participated
        </p>
        <button 
          className="view-projects-button"
          onClick={handleViewProjects}
          aria-label={`View projects from ${title}`}
        >
          View Projects
        </button>
      </div>
    </article>
  );
}

function HackathonList({ title, events }) {
  return (
    <section className="container">
      <h2 className="main-heading">{title}</h2>
      <div className="hackathon-cards">
        {events.map((event) => (
          <HackathonCard 
            key={event.id}
            {...event}
          />
        ))}
      </div>
    </section>
  );
}

function Past() {
  return (
    <section className="past-hackathons">
      <HackathonList title="Past Hackathons" events={hackathons} />
    </section>
  );
}

export default Past;