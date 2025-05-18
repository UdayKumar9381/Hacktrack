import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HackathonCard from '../../../components/hackathonSection/HackathonCard';
import './Future.css';

const API_URL = 'http://localhost:5002/hackathon/status/future';

function Future() {
  const [futureHackathons, setFutureHackathons] = useState([]);
  
  useEffect(() => {
    fetchFutureHackathons();
  }, []);

  const fetchFutureHackathons = async () => {
    try {
      const response = await axios.get(API_URL);
      setFutureHackathons(response.data);
    } catch (err) {
      console.error("Error fetching future hackathons:", err);
    }
  };

  return (
    <div className="future-container">
      <h2>Upcoming Hackathons</h2>
      <div className="cards-container">
        {futureHackathons.length > 0 ? (
          futureHackathons.map(hackathon => (
            <HackathonCard
              key={hackathon._id}
              title={hackathon.name}
              description={hackathon.description}
              image={hackathon.image ? `http://localhost:5002/${hackathon.image}` : '/default-placeholder.png'}
              startDate={hackathon.startDate}
              location={hackathon.location}
              collegeName={hackathon.collegeName}
              duration={hackathon.duration}
              status="Upcoming"
              showActions={false}  // Hides Edit/Delete buttons
            />
          ))
        ) : (
          <p>No upcoming hackathons found.</p>
        )}
      </div>
    </div>
  );
}

export default Future;
