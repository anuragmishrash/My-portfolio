import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaCode, FaNodeJs, FaTimes, FaInfoCircle } from 'react-icons/fa';
import './Internships.scss';

const Internships = () => {
  const [activeModal, setActiveModal] = useState(null);

  const internships = [
    {
      id: 1,
      position: 'Web Development Intern',
      company: 'iNeuBytes',
      icon: <FaCode />,
      duration: 'September 2024 - November 2024',
      certificate: 'https://ineubytes.com/public/img/uploads/media/1740849194.pdf',
      description: 'Contributed to the design and implementation of an AI-powered News Analysis and Search Platform. Developed frontend components with React and integrated AI/ML models.',
      skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Flask', 'AI Integration', 'Frontend Development'],
      detailedInfo: `🌐 Web Development Internship at iNeuBytes Technology and Services Pvt. Ltd.
📅 Duration: September 2024 – November 2024 (2 Months)
🌍 Mode: Virtual
👩‍🏫 Mentor: Geetha Pratyusha

✅ Overview:
During this AICTE-approved internship, I worked with iNeuBytes as a Web Development Intern, contributing to the development of innovative, real-world applications using modern web and backend technologies.

🛠️ Key Projects:
📰 1. News Article Search & Media Fetcher
Objective: A web application that allows users to search for real-time news articles, photos, and videos based on custom keywords using a live News API.
Your Role: Full Stack Developer (Frontend-Focused)

🔧 Technologies Used:
HTML, CSS, JavaScript, News API, GitHub, Postman

📌 Responsibilities:

Developed a responsive UI that dynamically fetches and displays news content.

Integrated a public News API to deliver keyword-specific headlines, images, and videos.

Implemented error handling and loading animations for better UX.

Optimized application performance across devices.

🤖 2. AI-powered News Prediction Platform (Fake/Real)
Objective: Collaborated with AI interns to develop a web platform that analyzes text input to predict whether the news is real or fake using an AI/ML model.
Your Role: Frontend Developer + Model Integrator

🔧 Technologies Used:
HTML, CSS, JavaScript, Flask, Node.js, Python (Model), Git, GitHub

📌 Responsibilities:

Built the frontend interface to collect user input and display prediction results.

Integrated a pre-trained ML model built in Python (Flask API) with the frontend.

Ensured smooth data flow between frontend and backend using REST APIs.

Participated in testing and improving model response accuracy on UI.`
    },
    {
      id: 2,
      position: 'Node.js Developer Intern',
      company: 'Celebal Technologies',
      icon: <FaNodeJs />,
      duration: 'May 2024 - August 2024',
      certificate: 'https://drive.google.com/file/d/1qaKd3y1OmFHsOPWNsaATwrFzDdIcI4kK/view?usp=drivesdk',
      description: 'Worked as a Node.js developer on backend systems and API development. Contributed to enterprise-level projects using modern JavaScript frameworks and server-side technologies.',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'API Development', 'REST API – CRUD Operations', 'JWT Authentication', 'Third-Party API Integration', 'Deployment & Version Control using GitHub', 'Backend Architecture'],
      detailedInfo: `🏢 Organization: Celebal Technologies
📍 Location: Virtual (Remote Internship)
📅 Duration: 8 Weeks (June–July 2025)
💻 Role: Backend Developer Intern

📌 Internship Overview
As a Backend Developer Intern at Celebal Technologies, I worked on real-world backend systems using industry-standard tools and frameworks. The internship was project-based and focused on full-stack development with an emphasis on the backend logic, API development, and database management.

🚀 Major Project: Appointment Scheduling Web Application
Built a full-fledged web application for managing appointments between users and service providers (e.g., patients and doctors).

Implemented role-based dashboards for Admins and Users.

Integrated authentication (JWT) and MongoDB database with Mongoose.

Enabled real-time booking, availability checks, and status updates.

Designed a clean backend structure using Node.js and Express.js.

🔧 Technologies Used:
Node.js | Express.js | MongoDB | Mongoose | JWT | React.js | REST API | Git & GitHub | Postman

Mentorship & Guidance
Grateful to my mentors for their constant support:
👩‍🏫 Priyanshi Ma'am
👩‍💼 Prerna Kamat Ma'am
👨‍💻 Sarthak Acharjee Sir`
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const openModal = (id) => {
    setActiveModal(id);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.classList.remove('modal-open');
  };

  // Function to format detailed info with styled sections
  const formatDetailedInfo = (info) => {
    const sections = info.split('\n\n');
    return sections.map((section, idx) => {
      // Check if section has an emoji header
      if (section.match(/^[🌐📅🌍👩‍🏫✅🛠️📰🔧📌🚀💻🏢📍]/)) {
        const lines = section.split('\n');
        const header = lines[0];
        const content = lines.slice(1).join('\n');
        
        return (
          <div key={idx} className="info-section">
            <h3 className="emoji-header">{header}</h3>
            {content && <div className="section-content">{content}</div>}
          </div>
        );
      }
      
      // For sections with subheaders (e.g. "1. News Article Search...")
      if (section.match(/^\d+\.\s/)) {
        const lines = section.split('\n');
        const header = lines[0];
        const content = lines.slice(1).join('\n');
        
        return (
          <div key={idx} className="info-section project-section">
            <h4 className="project-header">{header}</h4>
            {content && <div className="section-content">{content}</div>}
          </div>
        );
      }
      
      // For normal paragraphs
      return (
        <p key={idx} className="info-paragraph">
          {section}
        </p>
      );
    });
  };

  return (
    <section id="internships" className="internships section">
      <div className="container">
        <div className="section-title">
          <h2>My Internships</h2>
          <p>Professional experience and projects I've worked on as an intern</p>
        </div>
        
        <motion.div 
          className="internships-timeline"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {internships.map(internship => (
            <motion.div 
              key={internship.id} 
              className="internship-card"
              variants={item}
            >
              <div className="internship-icon">
                {internship.icon}
              </div>
              <div className="internship-content">
                <h3>{internship.position}</h3>
                <h4 className="company">{internship.company}</h4>
                <p className="duration">{internship.duration}</p>
                <p className="description">{internship.description}</p>
                
                <div className="skills-used">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                <div className="internship-actions">
                  <button 
                    onClick={() => openModal(internship.id)}
                    className="view-details"
                  >
                    View Details <FaInfoCircle />
                  </button>
                  <a 
                    href={internship.certificate} 
                    className="view-certificate"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="internships-note">
          <p>
            These internships have provided me with valuable industry experience and practical knowledge
            that complement my academic learning.
          </p>
        </div>
      </div>

      {/* Internship Details Modal */}
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
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
              
              {internships.map((internship) => (
                internship.id === activeModal && (
                  <div key={`modal-content-${internship.id}`} className="internship-detail-content">
                    <h2>{internship.position} at {internship.company}</h2>
                    <div className="internship-detailed-info">
                      {formatDetailedInfo(internship.detailedInfo)}
                    </div>
                    <div className="modal-actions">
                      <a 
                        href={internship.certificate} 
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Certificate <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>
                )
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Internships; 