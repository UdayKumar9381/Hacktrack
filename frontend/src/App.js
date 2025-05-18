import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// General Pages
import Homepage from './pages/homepage/Homepage';
import ResourcePage from './pages/resource/resource';
import HackathonGuidesPage from './pages/footer container/hackathonGuides/hackathonGuidesPage';
import SignupPage from './pages/navbar container/signup/signup';
import HostHackathon from './pages/footer container/host_hackathon/host_hackathon';
import ExploreProjectsPage from './pages/footer container/explore projects/ExploreProjectsPage';
import BrowseHackathonPage from './pages/footer container/browse_hackathon/BrowseHackathonPage';
import AboutHackathon from './pages/footer container/about/about_hackathon';
import Careers from './pages/footer container/careers/Careers';
import ContactPage from './pages/footer container/contact frontend/ContactPage';
import Help from './pages/footer container/help/Help';
import Present from './components/hackathonSection/present/Present';
import Past from './components/hackathonSection/past/Past';
import Future from './components/hackathonSection/future/Future';
import Regester from './components/hackathonSection/Register/Regester.js';

import StudentLogin from './pages/navbar container/loginpage/StudentLogin';
import LoginPage from './pages/navbar container/loginpage/LoginPage.js';

// Student Dashboard Components
import LayoutDashboard from './components/student/LayoutDashboard';
import Dashboard from './components/student/Dashboard';
import Profile from './components/student/Profile';

// Sidebar Components
import Certifications from "./components/student/sidebarComponents/Certifications";
import Submission from "./components/student/sidebarComponents/Submission";
import Participations from "./components/student/sidebarComponents/Participations";
import Studenthome from "./components/student/sidebarComponents/studHome";
import LeaderboardPage from './components/student/sidebarComponents/Leaderboard.js';
import HackathonRegister from './components/student/sidebarComponents/HackathonRegister.js';

// Import College Dashboard
import CollegeDashboard from './components/college dashboard/CollegeDashboard.js';

// Import College Login
import HostPage from './components/hostings page/HostPage.js';
import Hosting from './components/hostings page/Hosting.js';
import OrganiserLogin from './pages/navbar container/loginpage/OrganiserLogin.js';
import OrganiserSignup from './pages/navbar container/signup/OrganiserSignup.js';
import CollegeSignup from './pages/navbar container/signup/CollegeSignup.js';
import CollegeLogin from './pages/navbar container/loginpage/CollegeLogin.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* General User Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/resource" element={<ResourcePage />} />
        <Route path="/hackathon-guides" element={<HackathonGuidesPage />} />
        <Route path="/host-hackathon" element={<HostHackathon />} />
        <Route path="/explore-projects" element={<ExploreProjectsPage />} />
        <Route path="/browse-hackathon" element={<BrowseHackathonPage />} />
        <Route path="/about" element={<AboutHackathon />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/help" element={<Help />} />
        <Route path="/present" element={<Present />} />
        <Route path="/past" element={<Past />} />
        <Route path="/future" element={<Future />} />
        <Route path="/regester" element={<Regester />} />

        {/* Student Dashboard Routes */}
        <Route path="/studentdashboard" element={<LayoutDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} /> {/* Added profile route */}
          <Route path="certifications" element={<Certifications />} />
          <Route path="submission" element={<Submission />} />
          <Route path="participations" element={<Participations />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="studHome" element={<Studenthome />} />
          <Route path="HackathonRegister" element={<HackathonRegister />} />
        </Route>

        {/* College Dashboard Route */}
        <Route path="/collegedashboard/*" element={<CollegeDashboard/>} />
        <Route path="/HostPage" element={<HostPage />} />
        <Route path="/Hosting" element={<Hosting />} />
        <Route path="/organiserlogin" element={<OrganiserLogin />} />
        <Route path="/organisersignup" element={<OrganiserSignup />} />
        <Route path="/CollegeSignup" element={<CollegeSignup />} />
        <Route path="/CollegeLogin" element={<CollegeLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
