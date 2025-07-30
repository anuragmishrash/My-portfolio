import React from 'react';
import { motion } from 'framer-motion';
import './CustomLoader.scss';

const CustomLoader = ({ isLoading }) => {
  // Animation variants for the loader
  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    initial: {
      y: -20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.8,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
    },
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Text to be displayed under the loader
  const text = "Loading Anurag's Portfolio";

  if (!isLoading) return null;

  return (
    <div className="custom-loader-overlay">
      <motion.div
        className="custom-loader-container"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Main loader animation */}
        <div className="custom-loader">
          {/* Animated dots */}
          <motion.div className="dot" variants={itemVariants} custom={0} />
          <motion.div className="dot" variants={itemVariants} custom={1} />
          <motion.div className="dot" variants={itemVariants} custom={2} />
          <motion.div className="dot" variants={itemVariants} custom={3} />
          <motion.div className="dot" variants={itemVariants} custom={4} />
          
          {/* Animated ring */}
          <svg className="ring" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />
          </svg>

          {/* Animated circle */}
          <div className="pulse-circle"></div>
        </div>

        {/* Text under the loader */}
        <motion.div className="loader-text" variants={letterVariants}>
          {text.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: index * 0.05 + 1 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Code animation in the background */}
        <div className="code-animation">
          {Array(20).fill().map((_, i) => (
            <div key={i} className="code-line" style={{
              animationDelay: `${i * 0.1}s`,
              width: `${Math.random() * 60 + 20}%`
            }}></div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CustomLoader; 