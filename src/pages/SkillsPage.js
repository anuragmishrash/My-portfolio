import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Skills from '../components/UI/Skills';

// Lazy load the ThreeDEffects component
const ThreeDEffects = React.lazy(() => import('../components/UI/ThreeDEffects'));

const SkillsPage = () => {
  return (
    <motion.div 
      className="skills-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Skills />
      
      {/* 3D Skills Visualization */}
      <div className="three-d-container">
        <div className="container">
          <Suspense fallback={<div className="loading-placeholder">Loading 3D Skills View...</div>}>
            <ThreeDEffects skills={[
              "JavaScript", "React", "Node.js", "HTML", "CSS", "SCSS",
              "TypeScript", "MongoDB", "Express", "Git", "Responsive Design",
              "API Integration", "SQL", "Python", "UI/UX Design", "Three.js"
            ]} />
          </Suspense>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsPage; 