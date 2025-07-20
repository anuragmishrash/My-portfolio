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
              I'm a <strong>Computer Science undergraduate</strong> at Sir Padampat Singhania University (SPSU), Udaipur, with a passion for building robust, secure, and user-centric digital solutions. My primary interests lie in full-stack development, backend engineering, and cybersecurity.
            </p>
            <p>
              During my internship at Celebal Technologies, I worked as a Node.js Developer, where I designed and deployed RESTful APIs for enterprise applications, contributing to scalable and maintainable backend architectures.
            </p>
            <p>
              At iNeuBytes, I led the development of an AI-driven News Analysis platform, incorporating intelligent indexing and a clean user experience to simplify content discovery using modern web technologies.
            </p>
            <p>
              I specialize in the JavaScript/React ecosystem, and have hands-on experience with Node.js, Express, MongoDB, JWT Authentication, and REST APIs. My development philosophy is centered around performance, simplicity, and intuitive design. I also explore blockchain technologies and enjoy integrating emerging tools into real-world applications.
            </p>
            <p>
              I take pride in creating solutions that not only solve problems but are also easy to use and maintain. I'm always eager to learn, collaborate, and grow as a developer.
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
              <Link to="/internships" className="btn btn-outline">My Internships</Link>
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
              <p>Node.js Dev Intern at Celebal Technologies (May-Aug 2024)</p>
              <p>Web Dev Intern at iNeuBytes (Sep-Nov 2024)</p>
              <Link to="/internships" className="box-link">View Details</Link>
            </div>
            
            <div className="about-box">
              <div className="box-icon">
                <FaLaptopCode />
              </div>
              <h4>Projects</h4>
              <p>Appointment Scheduler, SPSU Marketplace, Blockchain-based E-Waste Management</p>
              <Link to="/projects" className="box-link">View Details</Link>
            </div>
            
            <div className="about-box">
              <div className="box-icon">
                <FaGraduationCap />
              </div>
              <h4>Certifications</h4>
              <p>Google Cybersecurity, Data, Ethereum Blockchain, Microsoft 365 Copilot</p>
              <Link to="/certifications" className="box-link">View Details</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 