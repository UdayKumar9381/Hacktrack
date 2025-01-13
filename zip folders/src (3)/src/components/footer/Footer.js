import React from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import footerVideo from "../../assests/footer.mp4"; // Adjust the import path based on your file structure

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="footer-video"
          >
            <source src={footerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="footer-right">
          <div className="footer-column">
            <h4>HackTrack</h4>
            <ul>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
              <li><Link to="/help" className="footer-link">Help</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Hackathons</h4>
            <ul>
              <li><Link to="/Browse-hackathon" className="footer-link">Browse hackathons</Link></li>
              <li><Link to="/explore-projects" className="footer-link">Explore projects</Link></li>
              <li><Link to="/host-hackathon" className="footer-link">host hackathon</Link></li>
              <li><Link to="/hackathon-guides" className="footer-link">Hackathon guides</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Connect's</h4>
            <ul className="social-links">
              <li>
                <FaGithub /> Github
              </li>
              <li>
                <a
                  href="https://www.instagram.com/khub_kiet?igsh=NjJsbHZnc3F1aHVn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="http://www.youtube.com/@Kiet-Hub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube /> YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/khub-kiet/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 HackTrack, Inc. All rights reserved.</p>
        <ul className="footer-bottom-links">
          <li>Community guidelines</li>
          <li>Security</li>
          <li>CA notice</li>
          <li>Privacy policy</li>
          <li>Terms of service</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
