import React from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-heading">
            <h1>Hack<br></br>Track</h1>
          </div>
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
            <h4>Connect's</h4>
            <ul className="social-links">
            <li>
                <a
                  href="https://github.com/RCTS-K-Hub/2024YearlyProject-Team9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub /> Github
                </a>
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
          <div className="footer-column">
            <h4>Contact Info</h4>
            <ul>
              <li>K-hub Team-09</li>
              <li>0001234-5578</li>
              <li>Khubteam09.com</li>
              <li>Khub@example.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p style={{ color: 'white' }}>
          © 2024 HackTrack, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;