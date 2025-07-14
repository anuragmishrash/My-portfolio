import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaCloudDownloadAlt, FaArrowDown, FaInstagram } from 'react-icons/fa';
import './Hero.scss';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://res.cloudinary.com/durayngkx/image/upload/v1744232405/Picsart_25-04-10_02-24-34-485_vxaceb.jpg" alt="Anurag Mishra" />
          </motion.div>
          
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="greeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hello, I'm
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Anurag Mishra
            </motion.h1>
            
            <motion.h2 
              className="title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Computer Science Undergraduate
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Full-stack developer with experience in cybersecurity and AI integration. 
              Currently pursuing B.Tech at SPSU, Udaipur with a focus on creating modern web applications.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link to="/contact" className="btn btn-primary btn-lg">
                Get In Touch
              </Link>
              <a href="resume.pdf" download className="btn btn-outline btn-lg">
                <FaCloudDownloadAlt /> Download Resume
              </a>
            </motion.div>
            
            <motion.div 
              className="hero-social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <a href="https://www.linkedin.com/in/anurag-mishra" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="mailto:itsanuragmishra99@gmail.com">
                <FaEnvelope />
              </a>
              <a href="https://www.instagram.com/its_anurag.m?igsh=MWwwZHNjbTkzMml6Zw==" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="scroll-down"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <span>Scroll Down</span>
            <FaArrowDown className="arrow-down" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 