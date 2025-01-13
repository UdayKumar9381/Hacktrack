import React, { useState } from 'react';
import './BrowseHackathonPage.css';

const BrowseHackathonPage = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const hackathons = [
    {
      title: 'AI for Good',
      date: 'March 20, 2024',
      category: 'AI',
      location: 'Online',
      description: 'A challenge to create innovative AI solutions for social good.',
      link: '/hackathons/ai-for-good'
    },
    {
      title: 'Healthcare Innovation Hack',
      date: 'April 5, 2024',
      category: 'Healthcare',
      location: 'San Francisco, CA',
      description: 'Join the challenge to develop healthcare innovations.',
      link: '/hackathons/healthcare-innovation'
    },
    {
      title: 'Blockchain Solutions',
      date: 'May 10, 2024',
      category: 'Blockchain',
      location: 'Online',
      description: 'Build cutting-edge solutions with blockchain technology.',
      link: '/hackathons/blockchain-solutions'
    },
    {
      title: 'Women in Tech Hackathon',
      date: 'June 1, 2024',
      category: 'Technology',
      location: 'New York, NY',
      description: 'Empowering women in the tech field through innovation.',
      link: '/hackathons/women-in-tech'
    }
  ];

  const filteredHackathons = hackathons.filter((hackathon) => {
    return (
      (categoryFilter === '' || hackathon.category === categoryFilter) &&
      (locationFilter === '' || hackathon.location === locationFilter)
    );
  });

  return (
    <div className="browse-hackathons">
      <h1>Browse Hackathons</h1>
      <p>Explore exciting hackathons and challenge yourself!</p>

      {/* Filter Section */}
      <div className="filters">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="AI">AI</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Blockchain">Blockchain</option>
          <option value="Technology">Technology</option>
        </select>

        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Online">Online</option>
          <option value="New York, NY">New York, NY</option>
          <option value="San Francisco, CA">San Francisco, CA</option>
        </select>
      </div>

      {/* Hackathon List */}
      <div className="hackathons-list">
        {filteredHackathons.length === 0 ? (
          <p>No hackathons found based on the selected filters.</p>
        ) : (
          filteredHackathons.map((hackathon, index) => (
            <div key={index} className="hackathon-card">
              <h2>{hackathon.title}</h2>
              <p>{hackathon.description}</p>
              <p><strong>Date:</strong> {hackathon.date}</p>
              <p><strong>Location:</strong> {hackathon.location}</p>
              <a href={hackathon.link} className="view-details">View Details</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseHackathonPage;
