import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/UI/Hero';
import About from '../components/UI/About';
import Skills from '../components/UI/Skills';
import Projects from '../components/UI/Projects';
import Internships from '../components/UI/Internships';
import Certifications from '../components/UI/Certifications';
import Contact from '../components/UI/Contact';

const HomePage = () => {
  // Initialize AOS animations on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.init({
        once: true, 
        duration: 800,
        easing: 'ease-in-out'
      });
    }
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7 }
    }
  };

  return (
    <motion.div 
      className="home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div variants={sectionVariants}>
      <Hero />
      </motion.div>
      
      <motion.div variants={sectionVariants} data-aos="fade-up">
      <About />
      </motion.div>
      
      <motion.div variants={sectionVariants} data-aos="fade-up">
      <Skills />
      </motion.div>
      
      <motion.div variants={sectionVariants} data-aos="fade-up">
      <Projects />
      </motion.div>
      
      <motion.div variants={sectionVariants} data-aos="fade-up">
        <Internships />
      </motion.div>
      
      <motion.div variants={sectionVariants} data-aos="fade-up">
      <Certifications />
      </motion.div>
      
      <motion.div variants={sectionVariants} data-aos="fade-up">
      <Contact />
      </motion.div>
    </motion.div>
  );
};

export default HomePage; 