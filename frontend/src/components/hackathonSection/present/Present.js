import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HackathonCard from '../../hackathonSection/HackathonCard'; 
import './Present.css';

const API_URL = 'http://localhost:5002/hackathon';

function Present() {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    fetchHackathons();
  }, []);

  const fetchHackathons = async () => {
    try {
      const res = await axios.get(`${API_URL}/status/present`); // Fetch only present hackathons
      setHackathons(res.data);
    } catch (err) {
      console.error("Error fetching hackathons:", err);
    }
  };

  return (
    <div className="hackathon-container">
      <h2>Ongoing Hackathons</h2>
      <div className="hackathon-cards">
        {hackathons.length > 0 ? (
          hackathons.map((hackathon) => (
            <HackathonCard
              key={hackathon._id}
              title={hackathon.name}
              description={hackathon.description}
              image={hackathon.image ? `http://localhost:5002/${hackathon.image}` : '/default-placeholder.png'}
              startDate={hackathon.startDate}
              endDate={hackathon.endDate}
              location={hackathon.location}
              collegeName={hackathon.collegeName}
              showActions={false}  // 🔴 Hides Edit/Delete buttons
            />
          ))
        ) : (
          <p>No ongoing hackathons found.</p>
        )}
      </div>
    </div>
  );
}

export default Present;
