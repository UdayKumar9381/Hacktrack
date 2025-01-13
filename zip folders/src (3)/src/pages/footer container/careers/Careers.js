import React, { useState } from 'react';
import './Careers.css'; // Don't forget to create and style the CSS file

const Careers = () => {
  const [applications, setApplications] = useState([]);

  // Sample job listings
  const jobs = [
    {
      title: 'Frontend Developer',
      description: 'Build modern, responsive web applications.',
      location: 'Remote',
      applyLink: '#frontend-apply',
    },
    {
      title: 'Backend Developer',
      description: 'Work with APIs, databases, and server-side logic.',
      location: 'On-site, New York',
      applyLink: '#backend-apply',
    },
    {
      title: 'UI/UX Designer',
      description: 'Design intuitive and engaging user interfaces.',
      location: 'Remote',
      applyLink: '#designer-apply',
    },
  ];

  const handleApplicationSubmit = (jobTitle) => {
    setApplications([...applications, jobTitle]);
    alert(`You applied for the ${jobTitle} position!`);
  };

  return (
    <div className="careers">
      <h2>Careers</h2>
      <p>Join our team and make an impact!</p>
      <div className="job-listings">
        {jobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <button onClick={() => handleApplicationSubmit(job.title)}>
              Apply Now
            </button>
            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
              Apply (External Link)
            </a>
          </div>
        ))}
      </div>
      <div className="applied-jobs">
        <h3>Applications</h3>
        <ul>
          {applications.map((job, index) => (
            <li key={index}>{job}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Careers;
