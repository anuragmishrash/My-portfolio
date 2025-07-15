import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import './MicroAnimations.scss';

// Animation provider component to be used around buttons, links, etc.
export const AnimatedElement = ({ children, type = 'button' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const buttonVariants = {
    rest: {
      scale: 1,
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)'
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 15
      }
    }
  };

  const linkVariants = {
    rest: {
      x: 0,
      color: 'var(--text-color)',
    },
    hover: {
      x: 5,
      color: 'var(--primary-color)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const cardVariants = {
    rest: { 
      y: 0,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)'
    },
    hover: { 
      y: -10,
      boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const getVariant = () => {
    switch(type) {
      case 'button': return buttonVariants;
      case 'link': return linkVariants;
      case 'icon': return iconVariants;
      case 'card': return cardVariants;
      default: return buttonVariants;
    }
  };

  return (
    <motion.div
      className={`animated-element ${type}`}
      variants={getVariant()}
      initial="rest"
      animate={isHovered ? "hover" : "rest"}
      whileTap={type === 'button' || type === 'card' ? "tap" : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      {isHovered && type === 'button' && (
        <motion.div 
          className="particle-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array(8).fill().map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0.8 
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 100, 
                y: (Math.random() - 0.5) * 100,
                opacity: 0,
                transition: { 
                  duration: Math.random() * 0.8 + 0.5 
                }
              }}
              style={{
                left: `${50 + (Math.random() - 0.5) * 30}%`,
                top: `${50 + (Math.random() - 0.5) * 30}%`,
                backgroundColor: `hsl(${Math.random() * 60 + 220}, 70%, 60%)`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// Text highlight animation
export const AnimatedText = ({ text, type = 'heading' }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    })
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    })
  };

  const renderText = () => {
    if (type === 'heading') {
      return text.split('').map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={characterVariants}
          className="animated-char"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ));
    } else {
      return text.split(' ').map((word, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={wordVariants}
          className="animated-word"
        >
          {word}{index !== text.split(' ').length - 1 && '\u00A0'}
        </motion.span>
      ));
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`animated-text ${type}`}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {renderText()}
    </motion.div>
  );
};

// Hover card with animated content
export const AnimatedCard = ({ children, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: delay * 0.2,
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    },
    hover: {
      y: -10,
      boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      y: -5,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="animated-card"
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="card-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Icon animation wrapper
export const AnimatedIcon = ({ children, color = 'var(--primary-color)' }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      rotate: -10,
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="animated-icon"
      style={{ color }}
      variants={iconVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="icon-pulse"
            style={{ backgroundColor: color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.2, scale: 1.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main component to export all animations
const MicroAnimations = {
  AnimatedElement,
  AnimatedText,
  AnimatedCard,
  AnimatedIcon
};

export default MicroAnimations; 