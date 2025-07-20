import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaCloudDownloadAlt, FaArrowDown, FaInstagram } from 'react-icons/fa';
import './Hero.scss';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        yoyo: Infinity,
        repeatDelay: 20
      }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: { 
      y: [-5, 5, -5], 
      transition: { 
        repeat: Infinity, 
        duration: 5,
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <ParticleBackground />
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>
      
      <div className="container">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.div 
            className="hero-image"
            variants={imageVariants}
          >
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
          >
            <img src="https://res.cloudinary.com/durayngkx/image/upload/v1744232405/Picsart_25-04-10_02-24-34-485_vxaceb.jpg" alt="Anurag Mishra" />
              <div className="image-glow"></div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-text"
            variants={itemVariants}
          >
            <motion.span 
              className="greeting"
              variants={itemVariants}
            >
              Hello, I'm
            </motion.span>
            
            <motion.h1
              variants={itemVariants}
              className="gradient-text"
            >
              Anurag Mishra
            </motion.h1>
            
            <motion.h2 
              className="title"
              variants={itemVariants}
            >
              Computer Science Undergraduate
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
            >
              Full-stack developer specializing in Node.js and React with industry experience through internships at Celebal Technologies and iNeuBytes. Passionate about creating secure, scalable web applications and exploring blockchain technologies. Focused on delivering elegant solutions to complex technical challenges.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              variants={itemVariants}
            >
              <Link to="/contact" className="btn btn-primary btn-lg btn-glow">
                Get In Touch
              </Link>
              <a href="Resume Anurag Mishra.pdf" download className="btn btn-outline btn-lg btn-outline-animated">
                <FaCloudDownloadAlt /> Download Resume
              </a>
            </motion.div>
            
            <motion.div 
              className="hero-social"
              variants={itemVariants}
            >
              <motion.a 
                href="https://www.linkedin.com/in/anurag-mishra" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a 
                href="mailto:itsanuragmishra99@gmail.com"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEnvelope />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/its_anurag.m?igsh=MWwwZHNjbTkzMml6Zw==" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="scroll-down"
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 2, duration: 0.8 }
            }}
          >
            <span>Scroll Down</span>
            <motion.div
              animate={{ 
                y: [0, 10, 0],
                transition: { 
                  repeat: Infinity, 
                  duration: 1.5,
                  ease: "easeInOut" 
                }
              }}
            >
            <FaArrowDown className="arrow-down" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 