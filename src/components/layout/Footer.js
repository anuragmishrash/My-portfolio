import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Anurag Mishra</h3>
            <p>Computer Science undergraduate focused on full-stack development and cybersecurity.</p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/skills">Skills</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/certifications">Certifications</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="mailto:itsanuragmishra99@gmail.com" target="_blank" rel="noopener noreferrer">
                  <FaEnvelope /> itsanuragmishra99@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919461132447">
                  <FaPhone /> +91 9461132447
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="social-links">
            <a href="https://www.linkedin.com/in/anurag-mishra" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="mailto:itsanuragmishra99@gmail.com">
              <FaEnvelope />
            </a>
          </div>
          
          <div className="copyright">
            <p>&copy; {year} Anurag Mishra. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 