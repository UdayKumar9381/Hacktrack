import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import HackathonSection from '../../components/hackathonSection/HackathonSection';
import OrganizersSection from '../../components/organizersSection/OrganizersSection';
import WelcomeSection from '../../components/welcomeSection/WelcomeSection';
import FaqSection from '../../components/faqSection/FaqSection';
import Milestone from '../../components/milestone/milestone';
import PromoteHackathon from '../../components/PromoteHackathon/PromoteHackathon';
import './Homepage.css'; // Add styles specific to the homepage

function Homepage() {
  return (
    <div className="homepage">
      {/* Include the Header */}
      <Header />

      {/* Main content */}
      <div className="main-content">
        <div className="sections-container">
          {/* Sections */}
          <WelcomeSection />
          <PromoteHackathon />
          <HackathonSection />
          <OrganizersSection />
          <FaqSection />
          <Milestone />
        </div>
      </div>

      {/* Include the Footer */}
      <Footer />
    </div>
  );
}

export default Homepage;
