import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Past.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const API_URL = 'https://hacktrack-rggs.onrender.com/hackathon';

function HackathonCard({ title, description, image, startDate, endDate, location, collegeName }) {
  return (
    <article className="hackathon-card">
      <img src={image} alt={title} className="hackathon-image" />
      <div className="hackathon-content">
        <h3 className="hackathon-title">{title}</h3>
        <p className="hackathon-description">{description}</p>
        <p><strong>Start:</strong> {new Date(startDate).toLocaleDateString()}</p>
        <p><strong>End:</strong> {new Date(endDate).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>College:</strong> {collegeName}</p>
      </div>
    </article>
  );
}

function HackathonList({ title, events }) {
  const cardsRef = useRef(null);

  const handlePrev = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="container">
      <h2 className="main-heading">{title}</h2>
      <div className="hackathon-cards-container">
        <div className="hackathon-cards" ref={cardsRef}>
          {events.length > 0 ? (
            events.map((event, index) => (
              <HackathonCard 
                key={index}
                title={event.name}
                description={event.description}
                image={event.image ? `https://hacktrack-rggs.onrender.com/${event.image}` : 'pastposter.jpg'}
                startDate={event.startDate}
                endDate={event.endDate}
                location={event.location}
                collegeName={event.collegeName}
              />
            ))
          ) : (
            <p>No hackathons found.</p>
          )}
        </div>
        
        <div className="carousel-nav">
          <button 
            className="carousel-button"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
          <button 
            className="carousel-button"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}


function Past() {
  const location = useLocation();
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchPastHackathons = async () => {
      try {
        const res = await axios.get(`${API_URL}/status/past`);
        setHackathons(res.data);
      } catch (error) {
        console.error('Failed to fetch past hackathons:', error);
      }
    };

    fetchPastHackathons();
  }, [location]);

  return (
    <div className="past-page">
      <HackathonList title="Past Hackathons" events={hackathons} />
    </div>
  );
}

export default Past;
