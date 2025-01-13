import React, { useRef } from 'react';
import './PromoteHackathon.css';

const promoteData = [
  { title: 'Join Our Next Hackathon!', description: 'Participate in our upcoming hackathon and unleash your creativity.', link: '#' },
  { title: 'Win Exciting Prizes!', description: 'Stand a chance to win amazing prizes and recognition for your skills.', link: '#' },
  { title: 'Network with Experts!', description: 'Meet industry leaders and expand your professional network.', link: '#' },
  { title: 'Innovate with Us!', description: 'Collaborate with like-minded individuals to create groundbreaking solutions.', link: '#' },
  { title: 'Learn New Skills!', description: 'Gain hands-on experience and learn from industry professionals during the hackathon.', link: '#' },
  { title: 'Showcase Your Talent!', description: 'Demonstrate your skills to a panel of judges and industry experts.', link: '#' },
];

function PromoteHackathon() {
  const sliderRef = useRef(null);

  return (
    <section className="promote-hackathon-section">
      <h2>Promote Your Hackathon</h2>
      <div className="promote-container" ref={sliderRef}>
        {promoteData.map((item, index) => (
          <div className="promote-item" key={index}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={item.link} className="promote-link">Learn More</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PromoteHackathon;
