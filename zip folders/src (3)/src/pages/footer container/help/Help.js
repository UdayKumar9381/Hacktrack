import React from 'react';
import { Link } from 'react-router-dom';
import './Help.css';  // CSS for styling the Help component

const Help = () => {
  return (
    <div className="help-container">
      <h3>Need Help?</h3>
      <p>If you have any questions, feel free to check our FAQs or contact support.</p>
      <div className="help-links">
        <a href="#faq" className="help-link">FAQ</a>
        <Link to="/contact" className="help-link">Contact Support</Link>  {/* Link to ContactSupport page */}
        <a href="#resources" className="help-link">Resources</a>
      </div>
    </div>
  );
};

export default Help;
