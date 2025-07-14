import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaUserTie } from 'react-icons/fa';
import './About.scss';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-title">
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </div>
        
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Who am I?</h3>
            <p>
              I'm a <strong>Computer Science undergraduate</strong> at SPSU, Udaipur with hands-on experience 
              in full-stack development and cybersecurity. I have contributed to the design and 
              implementation of an AI-powered News Analysis and Search Platform during a virtual 
              internship at iNeuBytes.
            </p>
            <p>
              I'm skilled in JavaScript, Node.js, and integrating AI/ML models into web applications, 
              with a passion for creating innovative solutions to complex problems.
            </p>
            
            <div className="education-info">
              <h3><FaGraduationCap /> Education</h3>
              <div className="education-item">
                <h4>B.Tech in Computer Science</h4>
                <p>SPSU, Udaipur | 2022 - 2026</p>
                <p>CGPA: 7.6</p>
              </div>
              <div className="education-item">
                <h4>12th Standard</h4>
                <p>VS Mahaveer Sr. Sec. School | 2021</p>
                <p>Percentage: 75%</p>
              </div>
              <div className="education-item">
                <h4>10th Standard</h4>
                <p>VS Mahaveer Sr. Sec. School | 2019</p>
                <p>Percentage: 84%</p>
              </div>
            </div>
            
            <div className="about-buttons">
              <Link to="/contact" className="btn btn-primary">Contact Me</Link>
              <Link to="/skills" className="btn btn-outline">My Skills</Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-boxes"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-box">
              <div className="box-icon">
                <FaUserTie />
              </div>
              <h4>Experience</h4>
              <p>Web Development Intern at iNeuBytes (Sep 2024 - Nov 2024)</p>
            </div>
            
            <div className="about-box">
              <div className="box-icon">
                <FaLaptopCode />
              </div>
              <h4>Projects</h4>
              <p>SPSU Marketplace, Blockchain-based E-Waste Management</p>
            </div>
            
            <div className="about-box">
              <div className="box-icon">
                <FaGraduationCap />
              </div>
              <h4>Certifications</h4>
              <p>Google Cybersecurity, Data, Ethereum Blockchain, Microsoft 365 Copilot</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 