import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGoogle, FaEthereum, FaNodeJs } from 'react-icons/fa';
import './Certifications.scss';

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      name: 'Foundations of Cybersecurity',
      issuer: 'Google',
      icon: <FaGoogle />,
      date: 'December 2023',
      link: 'https://coursera.org/share/2d7ca4563d291f6f765a7848cec0d907',
      description: 'Fundamental concepts of cybersecurity practices, tools, and techniques for protecting digital information and systems.'
    },
    {
      id: 2,
      name: 'Foundations: Data, Data, Everywhere',
      issuer: 'Google',
      icon: <FaGoogle />,
      date: 'December 2023',
      link: 'https://coursera.org/share/8a9c065aaca25d870da5d8a71e343cc8',
      description: 'In-depth exploration of data analytics fundamentals, data types, and data-driven decision-making processes.'
    },
    {
      id: 3,
      name: 'Ethereum Blockchain Application',
      issuer: 'LinkedIn Learning',
      icon: <FaEthereum />,
      date: 'February 2025',
      link: 'https://www.linkedin.com/learning/certificates/044fe8a7264423905d21b142b6436bae009eff42b9aa9c33dbb1df2c6345d1e7?trk=share_certificate',
      description: 'Development of decentralized applications using Ethereum smart contracts and blockchain technology.'
    },
    {
      id: 4,
      name: 'Web Development Internship',
      issuer: 'iNeuBytes',
      icon: null,
      date: 'November 2024',
      link: 'https://ineubytes.com/public/img/uploads/media/1740849194.pdf',
      description: 'Completion certificate for web development internship focused on building an AI-powered news platform.'
    },
    {
      id: 5,
      name: 'Node.js Development Internship',
      issuer: 'Celebal Technologies',
      icon: <FaNodeJs />,
      date: 'August 2024',
      link: 'https://drive.google.com/file/d/1qaKd3y1OmFHsOPWNsaATwrFzDdIcI4kK/view?usp=drivesdk',
      description: 'Certificate of completion for Node.js development internship, working on backend systems and API development.'
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

  return (
    <section id="certifications" className="certifications section">
      <div className="container">
        <div className="section-title">
          <h2>My Certifications</h2>
          <p>Professional certifications and achievements that validate my skills and knowledge</p>
        </div>
        
        <motion.div 
          className="certifications-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {certifications.map(cert => (
            <motion.a 
              key={cert.id} 
              className="certification-card"
              variants={item}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="certification-icon">
                {cert.icon || <span className="placeholder-icon">IN</span>}
              </div>
              <div className="certification-content">
                <h3>{cert.name}</h3>
                <p className="issuer">{cert.issuer} • {cert.date}</p>
                <p className="description">{cert.description}</p>
                <span className="view-certificate">
                  View Certificate <FaExternalLinkAlt />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
        
        <div className="certifications-note">
          <p>
            These certifications represent my commitment to continuous learning and skill development. 
            Click on any certificate card to view the full credential.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Certifications; 