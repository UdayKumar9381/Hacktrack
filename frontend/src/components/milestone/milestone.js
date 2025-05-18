import React, { useEffect, useState, useRef } from 'react';
import './milestone.css';

const Milestone = () => {
  // Define the milestone targets
  const milestones = [
    { target: 1896, label: 'HackTrack Participants' },
    { target: 600, label: 'HackTrack Alumni Network' },
    { target: 2067, label: 'Total Problem Statements' },
    { target: 3897, label: 'Participating Institutions' }
  ];

  return (
    <div className="milestone-section">
      <h2>MILESTONE</h2>
      <div className="milestone-container">
        {milestones.map((milestone, index) => (
          <MilestoneItem key={index} target={milestone.target} label={milestone.label} />
        ))}
      </div>
    </div>
  );
};

// Component for each milestone item with animated counter
const MilestoneItem = ({ target, label }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Create an intersection observer to detect when the milestone is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 } // Start the animation when 50% of the milestone item is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // Duration of the animation in milliseconds
      const increment = target / (duration / 10); // Calculate the increment based on the duration
      const counter = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount + increment >= target) {
            clearInterval(counter);
            return target; // Stop the counter when the target is reached
          }
          return prevCount + increment;
        });
      }, 10);

      // Cleanup the interval on component unmount
      return () => clearInterval(counter);
    }
  }, [isVisible, target]);

  return (
    <div className="milestone-item" ref={ref}>
      <h3>
        {Math.floor(count)}
        {count >= target && '+'} {/* Add the + symbol when the count reaches the target */}
      </h3>
      <p>{label}</p>
    </div>
  );
};

export default Milestone;