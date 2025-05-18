import React, { useState } from 'react';
import './OrganizersSection.css';

const organizersData = [
  {
    name: 'Chairman',
    logo: '/assets/organizer 1.jpg', // Correct path for public folder
    description: 'Viswam Sir, Chairman of KIET Group of Institutions, is a dynamic leader known for his visionary approach and commitment to academic excellence.',
  },
  {
    name: 'Principal',
    logo: '/assets/organizer 2.jpg',
    description: 'Revathi Madam, the Principal of KIET Group of Institutions, is a dedicated educator known for her leadership, academic vision, and commitment to student development."',
  }, 
  {
    name: 'Vice Principal',
    logo: '/assets/organizer 3.jpg',
    description: 'Ramkiran Sir, the Dean of Academics, is a dedicated and respected leader known for his commitment to academic excellence and student success.',
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
    description: 'Ajay, an alumnus of KIET Group of Institutions, now works at IIIT Hyderabad. He is recognized for his tech expertise and mentorship, and currently serves as a mentor for our team.',
  },
  {
    name: 'Mentor',
    logo: '/assets/mentor 2.ico',
    description: 'Bhanu Prabhas is an alumnus of KIET Group of Institutions and currently works at IIIT Hyderabad. He is known for his expertise in technology and his contributions to mentoring students.',
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
