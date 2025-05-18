import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './resource.css';

const Resources = () => {
  const [activeSection, setActiveSection] = useState('homepage');

  const sections = [
    {
      id: 'homepage',
      title: '🚀 HackTrack Platform Overview',
      content: (
        <>
          <p className="highlight">Your all-in-one hackathon management ecosystem</p>
          <ul>
            <li><strong>🌐 Interactive Header:</strong> Seamless navigation with dynamic hackathon filters (Live/Upcoming/Past)</li>
            <li><strong>🎥 Immersive Welcome:</strong> 3D animated showcase of platform capabilities</li>
            <li><strong>⚡ Real-time Hackathon Feed:</strong> Curated events with smart recommendations</li>
            <li><strong>👥 Organizer Network:</strong> Connect with industry leaders and tech communities</li>
            <li><strong>❓ Smart FAQ:</strong> AI-powered question answering with live support</li>
            <li><strong>📈 Growth Metrics:</strong> Live participation analytics and impact tracking</li>
          </ul>
        </>
      )
    },
    {
      id: 'student',
      title: '🎓 Student Superpowers',
      content: (
        <>
          <p className="highlight">Everything you need to boost your hackathon journey</p>
          <ul>
            <li><strong>📜 Digital Certificates:</strong> Blockchain-verified achievement records</li>
            <li><strong>💻 Project Showcase:</strong> GitHub-integrated submission system</li>
            <li><strong>📅 Participation Timeline:</strong> Visualized event history with skill mapping</li>
            <li><strong>🏆 Dynamic Scoreboards:</strong> Real-time ranking with skill badges</li>
            <li><strong>🔔 Smart Registration:</strong> Personalized event recommendations</li>
            <li><strong>🤝 Team Finder:</strong> Connect with complementary skill partners</li>
          </ul>
        </>
      )
    },
    {
      id: 'college',
      title: '🏛️ College Command Center',
      content: (
        <>
          <p className="highlight">Complete toolkit for hackathon organizers</p>
          <ul>
            <li><strong>👨‍💻 Organizer Portal:</strong> Role-based access control system</li>
            <li><strong>🎖️ Automated Certificates:</strong> Custom template designer with batch processing</li>
            <li><strong>📊 Advanced Analytics:</strong> Participant skill heatmaps and event insights</li>
            <li><strong>🔍 Submission Evaluator:</strong> Rubric-based judging system</li>
            <li><strong>📨 Integrated Messaging:</strong> Announcement system with read receipts</li>
            <li><strong>🛠️ API Access:</strong> Connect with your existing campus systems</li>
          </ul>
        </>
      )
    },
    {
      id: 'tech',
      title: '🛠️ Technical Architecture',
      content: (
        <>
          <p className="highlight">Built for scale and performance</p>
          <div className="tech-stack">
            <div>
              <h4>Frontend</h4>
              <ul>
                <li>React 18 with Concurrent Mode</li>
                <li>Next.js for SSR optimization</li>
                <li>Three.js for 3D visualizations</li>
                <li>Framer Motion animations</li>
              </ul>
            </div>
            <div>
              <h4>Backend</h4>
              <ul>
                <li>Node.js with Express</li>
                <li>MongoDB Atlas (NoSQL)</li>
                <li>Redis for caching</li>
                <li>Socket.io for real-time updates</li>
              </ul>
            </div>
            <div>
              <h4>DevOps</h4>
              <ul>
                <li>Docker containerization</li>
                <li>Kubernetes orchestration</li>
                <li>AWS ECS deployment</li>
                <li>CI/CD with GitHub Actions</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    {
      id: 'roadmap',
      title: '🗺️ Development Roadmap',
      content: (
        <>
          <p className="highlight">What's coming next in our journey</p>
          <div className="timeline">
            <div className="milestone">
              <div className="date">Q3 2023</div>
              <div className="content">AI-powered team matching algorithm</div>
            </div>
            <div className="milestone">
              <div className="date">Q4 2023</div>
              <div className="content">Mobile app with push notifications</div>
            </div>
            <div className="milestone">
              <div className="date">Q1 2024</div>
              <div className="content">Sponsorship management portal</div>
            </div>
            <div className="milestone">
              <div className="date">Q2 2024</div>
              <div className="content">Virtual hackathon space with WebRTC</div>
            </div>
          </div>
        </>
      )
    }
  ];

  return (
    <div className="resources-container">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hero"
      >
        <h1>HackTrack Resources</h1>
        <p className="subtitle">
          The next-generation platform transforming how hackathons are organized, 
          participated in, and recognized worldwide.
        </p>
      </motion.div>

      <div className="navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="content-section"
        >
          {sections.find(s => s.id === activeSection)?.content}
        </motion.div>
      </AnimatePresence>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-value">150+</div>
          <div className="stat-label">Hackathons Hosted</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">25K+</div>
          <div className="stat-label">Active Students</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">300+</div>
          <div className="stat-label">Partner Colleges</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">10K+</div>
          <div className="stat-label">Projects Submitted</div>
        </div>
      </div>
    </div>
  );
};

export default Resources;