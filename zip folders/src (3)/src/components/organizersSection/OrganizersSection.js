import React, { useState } from 'react';
import './OrganizersSection.css';

const organizersData = [
  {
    name: 'Chairman',
    logo: '/assets/organizer 1.jpg', // Correct path for public folder
    description: 'This is a brief description of Organizer 1.',
  },
  {
    name: 'Principal',
    logo: '/assets/organizer 2.jpg',
    description: 'This is a brief description of Organizer 2.',
  },
  {
    name: 'Vice Principal',
    logo: '/assets/organizer 3.jpg',
    description: 'This is a brief description of Organizer 3.',
  },
];

const additionalOrganizers = [
  {
    name: 'Organizer',
    logo: '/assets/Bhanu-akka.ico',
    description: 'Durga Bhavani, an alumni of KIET College, is the organizer of this hackathon. Her dedication to nurturing innovation and talent is inspiring a new generation of creators and innovators.',
  },
  {
    name: 'Mentor',
    logo: '/assets/mentor 1.ico',
    description: 'This is a brief description of Organizer 5.',
  },
  {
    name: 'Mentor',
    logo: '/assets/mentor 2.ico',
    description: 'This is a brief description of Organizer 6.',
  },
];

function OrganizersSection() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="organizers-section">
      <h2>Our Organizers</h2>
      <div className="organizers-container">
        {/* Render first 3 organizers */}
        {organizersData.map((organizer, index) => (
          <div className="card" key={index}>
            <div className="card-inner">
              <div className="card-front">
                <img src={organizer.logo} alt={organizer.name} />
                <h3>{organizer.name}</h3>
              </div>
              <div className="card-back">
                <h3>{organizer.name}</h3>
                <p>{organizer.description}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Conditionally render additional organizers */}
        {showMore &&
          additionalOrganizers.map((organizer, index) => (
            <div className="card" key={index}>
              <div className="card-inner">
                <div className="card-front">
                  <img src={organizer.logo} alt={organizer.name} />
                  <h3>{organizer.name}</h3>
                </div>
                <div className="card-back">
                  <h3>{organizer.name}</h3>
                  <p>{organizer.description}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Show more / show less button */}
      <button className="show-more" onClick={toggleShowMore}>
        {showMore ? 'Show Less' : 'Show More'}
      </button>
    </section>
  );
}

export default OrganizersSection;
