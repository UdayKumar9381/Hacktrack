import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage/Homepage.js';
import UserAccountPage from './pages/navbar container/userProfile/UserAccountPage.js';
import RegisterPage from './pages/hackathonRegistration/RegisterPage.js'; // Import RegisterPage
import OngoingHackathonPage from './pages/ongoinghackathon/OngoingHackathonPage.js'; // Import OngoingHackathonPage
import HackathonGuidesPage from './pages/footer container/hackathonGuides/hackathonGuidesPage.js';
import SignupPage from './pages/navbar container/signup/signup.jsx';
import LoginPages from './pages/navbar container/loginpage/logins.jsx';
import HostHackathon from './pages/footer container/host_hackathon/host_hackathon.js';
import ExploreProjectsPage from './pages/footer container/explore projects/ExploreProjectsPage.js';
import BrowseHackathonPage from './pages/footer container/browse_hackathon/BrowseHackathonPage.js';
import AboutHackathon from './pages/footer container/about/about_hackathon.js';
import Careers from './pages/footer container/careers/Careers.js';
import ContactPage from './pages/footer container/contact frontend/ContactPage.js';
import Help from './pages/footer container/help/Help.js';
import Present from './components/hackathonSection/present/Present.js';
import Past from './components/hackathonSection/past/Past.js';
import Future from './components/hackathonSection/future/Future.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/signup' element=<SignupPage/> />
        <Route path="/login" element={<LoginPages />} />
        <Route path="/account" element={<UserAccountPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* New Register page route */}
        <Route path="/ongoing" element={<OngoingHackathonPage />} /> {/* Ongoing Hackathon page route */}
        <Route path="/hackathon-guides" element={<HackathonGuidesPage />} />
        <Route path="/host-hackathon" element={<HostHackathon/>} />
        <Route path="/explore-projects" element={<ExploreProjectsPage/>} />
        <Route path="/Browse-hackathon" element={<BrowseHackathonPage/>} />
        <Route path="/about" element={<AboutHackathon/>} />
        <Route path="/careers" element={<Careers/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/help" element={<Help/>} />
        <Route path="/present" element={<Present/>} />
        <Route path="past" element={<Past/>} />
        <Route path="future" element={<Future/>} />
      </Routes>
    </Router>
  );
}

export default App;
