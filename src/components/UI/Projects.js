import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaGithub, FaExternalLinkAlt, FaCode, FaCube } from 'react-icons/fa';
import './Projects.scss';
import { WebDevIllustration, MobileDevIllustration } from './CustomIllustrations';
import MicroAnimations from './MicroAnimations';

// Lazy-loaded ThreeDEffects component to improve initial loading time
const ThreeDEffects = React.lazy(() => import('./ThreeDEffects'));

const Projects = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [show3D, setShow3D] = useState(false);
  
  // Define skills exactly as they appear in the Skills component, but remove Git, Webpack, Docker, Heroku, Python, and AWS
  const skills = [
    // Programming Languages
    'JavaScript', 'C++', 'Java', 'HTML/CSS', 'Solidity',
    
    // Technologies & Frameworks
    'React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'RESTful APIs', 'Web3.js', 'AI/ML Integration',
    
    // Tools & Ecosystems
    'MERN Stack', 'GitHub', 'VS Code', 'Postman', 'Blockchain', 'Web3', 'TensorFlow', 'NPM', 
    'Vercel'
  ];
  
  // Check if dark mode is enabled using the body class
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.body.classList.contains('dark-mode');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
    // Create a MutationObserver to watch for class changes on body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    
    // AOS initialization for scroll animations
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-in-out'
      });
    }
    
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Appointment Scheduler',
      description: 'An interactive web application for scheduling and managing appointments with a user-friendly interface. The platform offers separate dashboards for businesses and clients with real-time availability management.',
      lightModeImage: 'https://res.cloudinary.com/durayngkx/image/upload/v1752249909/Screenshot_2025-07-11_213202_ygcn8g.png',
      darkModeImage: 'https://res.cloudinary.com/durayngkx/image/upload/v1752249908/Screenshot_2025-07-11_213027_xfmxc1.png',
      technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT Authentication'],
      githubLink: 'https://github.com/anuragmishrash/appointment-scheduler',
      demoLink: 'https://appointment-scheduler-drab.vercel.app/',
      illustration: <MobileDevIllustration color={isDarkMode ? '#8a6eff' : '#6e57e0'} />,
      details: [
        'User authentication and profile management',
        'Business service and availability management',
        'Appointment booking, rescheduling and tracking',
        'Calendar integration with real-time updates',
        'Responsive design for mobile and desktop'
      ]
    },
    {
      id: 2,
      title: 'SPSU Marketplace',
      description: 'A peer-to-peer campus item exchange platform allowing students to buy, sell, and trade items within the university community.',
      image: 'https://res.cloudinary.com/durayngkx/image/upload/v1752251232/Screenshot_2025-07-11_215510_zv0ivz.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL'],
      githubLink: '#',
      demoLink: '#',
      illustration: <WebDevIllustration color={isDarkMode ? '#8a6eff' : '#6e57e0'} />,
      details: [
        'Implemented user authentication and profile management',
        'Created secure transaction system with messaging functionality',
        'Designed responsive interface for mobile and desktop',
        'Built RESTful API endpoints for frontend integration'
      ]
    },
    {
      id: 3,
      title: 'Blockchain-based E-Waste Management',
      description: 'An Ethereum-powered solution for tracking and managing electronic waste sustainably with transparent record-keeping.',
      image: 'https://res.cloudinary.com/durayngkx/image/upload/v1752251208/Screenshot_2025-04-10_215513_m7ub8o.png',
      technologies: ['Solidity', 'Ganache', 'MetaMask', 'HTML', 'CSS', 'JavaScript', 'Node.js'],
      githubLink: '#',
      demoLink: '#',
      illustration: <WebDevIllustration color={isDarkMode ? '#8a6eff' : '#6e57e0'} />,
      details: [
        'Developed smart contracts for secure e-waste tracking',
        'Integrated MetaMask for blockchain interactions',
        'Created dashboard for visualizing waste flow and recycling metrics',
        'Implemented reward system for responsible e-waste disposal'
      ]
    }
  ];

  const openModal = (id) => {
    setActiveModal(id);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.classList.remove('modal-open');
  };

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Toggle 3D view
  const toggle3D = () => {
    setShow3D(prev => !prev);
  };

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <MicroAnimations.AnimatedText text="My Projects" type="heading" />
          <p>Some of my recent work that highlights my development skills and experience</p>
        </motion.div>

        <div className="view-toggles">
          <MicroAnimations.AnimatedElement type="button">
            <button className={`view-toggle-btn ${show3D ? 'active' : ''}`} onClick={toggle3D}>
              <FaCube /> {show3D ? 'Hide 3D Skills View' : 'Show 3D Skills View'}
            </button>
          </MicroAnimations.AnimatedElement>
        </div>

        {/* 3D View Section - Always render but conditionally show */}
        <AnimatePresence>
          {show3D && (
            <motion.div
              className="threed-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Suspense fallback={<div className="loading-placeholder">Loading 3D View...</div>}>
                <ThreeDEffects skills={skills} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid - Always visible */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <MicroAnimations.AnimatedCard key={project.id} delay={index}>
            <Tilt
              className="tilt-wrapper"
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              transitionSpeed={1500}
              scale={1.02}
              glare
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareBorderRadius="10px"
            >
              <motion.div
                className="project-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
              >
                <div className="project-image">
                    {project.title === 'Appointment Scheduler' ? (
                      <img 
                        src={isDarkMode ? project.darkModeImage : project.lightModeImage} 
                        alt={project.title} 
                        className="real-image" 
                      />
                    ) : (
                      <img src={project.image} alt={project.title} className="real-image" />
                    )}
                    <div className="illustration-overlay">
                      {project.illustration}
                    </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                      <MicroAnimations.AnimatedElement type="button">
                    <button
                      className="details-btn"
                      onClick={() => openModal(project.id)}
                    >
                      <FaCode /> Details
                    </button>
                      </MicroAnimations.AnimatedElement>
                      <MicroAnimations.AnimatedElement type="button">
                        <a href={project.githubLink} 
                           className="action-btn code-btn"
                           target="_blank" 
                           rel="noopener noreferrer">
                      <FaGithub /> Code
                    </a>
                      </MicroAnimations.AnimatedElement>
                      <MicroAnimations.AnimatedElement type="button">
                        <a href={project.demoLink} 
                           className="action-btn demo-btn"
                           target="_blank" 
                           rel="noopener noreferrer">
                      <FaExternalLinkAlt /> Demo
                    </a>
                      </MicroAnimations.AnimatedElement>
                  </div>
                </div>
              </motion.div>
            </Tilt>
            </MicroAnimations.AnimatedCard>
          ))}
        </div>

        {/* Project Modals */}
        <AnimatePresence>
          {activeModal !== null && (
            <motion.div 
              className="modal-overlay" 
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
          >
              <motion.div
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 200 
                }}
              >
              <button className="modal-close" onClick={closeModal}>×</button>
                {projects.map((project) => (
                  project.id === activeModal && (
                    <div key={`modal-content-${project.id}`}>
              <h2>{project.title}</h2>
                      <div className="modal-image">
                        {project.title === 'Appointment Scheduler' ? (
                          <img 
                            src={isDarkMode ? project.darkModeImage : project.lightModeImage} 
                            alt={project.title} 
                          />
                        ) : (
                          <img src={project.image} alt={project.title} />
                        )}
                      </div>
              <p className="modal-description">{project.description}</p>
              <div className="modal-details">
                <h3>Key Features:</h3>
                <ul>
                  {project.details.map((detail, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              {detail}
                            </motion.li>
                  ))}
                </ul>
              </div>
              <div className="modal-tech">
                <h3>Technologies Used:</h3>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                            <motion.span 
                              key={index} 
                              className="tech-tag"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {tech}
                            </motion.span>
                  ))}
                </div>
              </div>
              <div className="modal-links">
                        <MicroAnimations.AnimatedElement type="button">
                <a href={project.githubLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> View on GitHub
                </a>
                        </MicroAnimations.AnimatedElement>
                        <MicroAnimations.AnimatedElement type="button">
                <a href={project.demoLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> Live Demo
                </a>
                        </MicroAnimations.AnimatedElement>
              </div>
            </div>
                  )
        ))}
              </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects; 