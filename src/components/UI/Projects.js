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
  
  // Skills array for 3D visualization — aligned with actual stack
  const skills = [
    // Programming Languages
    'JavaScript', 'Java', 'C++', 'HTML/CSS',
    
    // Technologies & Frameworks
    'React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'RESTful APIs', 'Socket.io', 'JWT Auth', 'AI/ML Integration',
    
    // Tools & Ecosystems
    'MERN Stack', 'GitHub', 'VS Code', 'Postman', 'MongoDB Atlas', 'Vercel', 'Tailwind CSS', 'Framer Motion', 'React Query', 'Mongoose', 'Bcryptjs', 'Gemini API'
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
      title: 'FeedScope AI',
      description: 'An AI-powered multilingual feedback management platform with real-time sentiment analysis, emotion detection, and smart admin dashboards — built for organizations that need to act on feedback instantly.',
      image: '/images/FeedScope AI Dashboard .png',
      technologies: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Python FastAPI', 'HuggingFace', 'Google Gemini API', 'Socket.io', 'JWT', 'Tailwind CSS', 'Framer Motion'],
      githubLink: 'https://github.com/anuragmishrash/FeedScope-AI',
      demoLink: 'https://feed-scope-ai.vercel.app/',
      illustration: <WebDevIllustration color={isDarkMode ? '#8a6eff' : '#6e57e0'} />,
      details: [
        '✨ Real-time admin dashboard with animated KPI counters and [NEW] badge flash',
        '🌍 Multilingual sentiment & emotion analysis (Hindi + English) via XLM-RoBERTa with 92.4% accuracy — no translation layer needed',
        '🤖 On-demand AI summarization via Google Gemini 2.5 Flash with MongoDB-cached results (1hr TTL) and stale cache detection',
        '🎫 Automated ticket progression with MongoDB TTL-based cleanup',
        '📊 92.4% sentiment accuracy, 58ms Socket.io latency, 73.6% cache hit rate',
        '🔐 Optional authentication + guest ticket claim via localStorage bridge',
        '⚡ Stale cache detection with real-time Socket.io notifications',
        '📖 Auto-progression ticket lifecycle (New → In Review → Being Resolved → Resolved) with public tracking page and guest ticket claim'
      ]
    },
    {
      id: 2,
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
      id: 3,
      title: 'Smart Bookmark',
      description: 'A minimal, real-time bookmark manager with instant cross-tab sync, Google OAuth, and a premium glassmorphic UI — built with Next.js 15 and Supabase.',
      image: '/images/Smart Bookmark.png',
      technologies: ['Next.js 15', 'Supabase Auth', 'PostgreSQL', 'Supabase Realtime', 'Tailwind CSS v4', 'Framer Motion', 'TypeScript'],
      githubLink: 'https://github.com/anuragmishrash/smart-bookmark',
      demoLink: 'https://smart-bookmark-kohl.vercel.app/',
      illustration: <WebDevIllustration color={isDarkMode ? '#8a6eff' : '#6e57e0'} />,
      details: [
        'Real-time cross-tab sync via Supabase Realtime — add or delete a bookmark in one tab and it instantly reflects everywhere',
        'Google OAuth sign-in with Row-Level Security (RLS) ensuring each user can only access their own data',
        'Instant search filtering bookmarks by title or URL with zero latency',
        'Premium glassmorphic dark theme + clean high-contrast light mode, fully responsive across all devices'
      ]
    },
    {
      id: 4,
      title: 'TaskFlow',
      description: 'A real-time collaborative task management platform with live presence, analytics dashboards, and enterprise-grade auth — built for teams that move fast.',
      image: '/images/TaskFlow.png',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB Atlas', 'Socket.io', 'JWT', 'bcrypt', 'React Query', 'Recharts', 'Tailwind CSS'],
      githubLink: 'https://github.com/anuragmishrash/taskflow',
      demoLink: 'https://task-manager-henna-psi.vercel.app/',
      illustration: <WebDevIllustration color={isDarkMode ? '#8a6eff' : '#6e57e0'} />,
      details: [
        'Real-time collaboration using Socket.io — task updates and status changes reflect live across all connected users',
        'Role-based access control (RBAC) with JWT auth and bcrypt-secured sessions',
        'Interactive analytics dashboard with Recharts visualizing task completion trends and team workload',
        'Full task lifecycle management with drag-and-drop boards, priority tagging, deadlines, and team assignment'
      ]
    },
    {
      id: 5,
      title: 'Talencee — Job Portal',
      description: 'A full-stack MERN job portal with dynamic content management, advanced job filtering, resume upload, and automated email notifications — deployed and production-ready.',
      image: '/images/Talencee — Job Portal.png',
      technologies: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Multer', 'Nodemailer', 'Framer Motion', 'Tailwind CSS'],
      githubLink: 'https://github.com/anuragmishrash/Talencee-Clone',
      demoLink: 'https://talencee-clone.vercel.app/',
      illustration: <WebDevIllustration color={isDarkMode ? '#8a6eff' : '#6e57e0'} />,
      details: [
        'Dynamic job listings with advanced filters for location, job type (Full-time/Internship), and work mode (Onsite/Remote/Hybrid)',
        'Resume upload system (PDF/DOC, 5MB limit) with automated SMTP email notifications to applicant and HR',
        'Admin CMS panel for managing hero content, services, testimonials, and job postings without any code changes',
        'Custom animated cursor, smooth Framer Motion transitions, fully responsive across all screen sizes'
      ]
    },
    {
      id: 6,
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