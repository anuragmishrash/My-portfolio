import React from 'react';
import { motion } from 'framer-motion';
import './Skills.scss';

const Skills = () => {
  // Programming Languages
  const languages = [
    { name: 'JavaScript', percentage: 85 },
    { name: 'C++', percentage: 80 },
    { name: 'Java', percentage: 75 },
    { name: 'Python', percentage: 70 },
    { name: 'HTML/CSS', percentage: 90 },
    { name: 'Solidity', percentage: 65 }
  ];

  // Technologies and Frameworks
  const technologies = [
    { name: 'React.js', percentage: 85 },
    { name: 'Node.js', percentage: 80 },
    { name: 'Express.js', percentage: 75 },
    { name: 'MongoDB', percentage: 70 },
    { name: 'MySQL', percentage: 75 },
    { name: 'RESTful APIs', percentage: 85 },
    { name: 'Web3.js', percentage: 65 },
    { name: 'AI/ML Integration', percentage: 70 }
  ];

  const softSkills = [
    { name: 'Problem Solving', percentage: 90 },
    { name: 'Communication', percentage: 85 },
    { name: 'Team Collaboration', percentage: 90 },
    { name: 'Time Management', percentage: 80 }
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
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <div className="section-title">
          <h2>My Skills</h2>
          <p>Technical and professional skills that I've developed over the years</p>
        </div>

        <div className="skills-content">
          <motion.div 
            className="skills-group"
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true }}
          >
            <h3>Programming Languages</h3>
            <div className="skills-list">
              {languages.map((skill, index) => (
                <motion.div key={index} className="skill-item" variants={item}>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="skills-group"
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true }}
          >
            <h3>Technologies & Frameworks</h3>
            <div className="skills-list">
              {technologies.map((skill, index) => (
                <motion.div key={index} className="skill-item" variants={item}>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="skills-group"
            initial="hidden"
            whileInView="show"
            variants={container}
            viewport={{ once: true }}
          >
            <h3>Professional Skills</h3>
            <div className="skills-list">
              {softSkills.map((skill, index) => (
                <motion.div key={index} className="skill-item" variants={item}>
                  <div className="skill-info">
                    <h4>{skill.name}</h4>
                    <span>{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="skills-extras">
          <motion.div 
            className="skills-tools"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Tools & Ecosystems</h3>
            <div className="skills-badges">
              <span>MERN Stack</span>
              <span>Git</span>
              <span>GitHub</span>
              <span>VS Code</span>
              <span>Postman</span>
              <span>Blockchain</span>
              <span>Web3</span>
              <span>TensorFlow</span>
              <span>NPM</span>
              <span>Webpack</span>
              <span>Docker</span>
              <span>Heroku</span>
              <span>Vercel</span>
              <span>AWS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 