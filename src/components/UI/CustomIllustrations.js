import React from 'react';
import { motion } from 'framer-motion';
import './CustomIllustrations.scss';

// Web Development Illustration
export const WebDevIllustration = ({ color = 'var(--primary-color)' }) => (
  <motion.div 
    className="illustration web-dev"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      {/* Monitor */}
      <motion.rect 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        x="40" y="20" width="120" height="80" rx="5" 
        stroke={color} strokeWidth="3" fill="transparent" 
      />
      
      {/* Screen */}
      <motion.rect 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        x="50" y="30" width="100" height="60" 
        fill="rgba(var(--primary-color-rgb), 0.1)" 
      />
      
      {/* Code lines */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <rect x="55" y="40" width="40" height="3" fill={color} />
        <rect x="55" y="48" width="60" height="3" fill={color} opacity="0.7" />
        <rect x="55" y="56" width="50" height="3" fill={color} opacity="0.5" />
        <rect x="55" y="64" width="30" height="3" fill={color} opacity="0.8" />
        <rect x="55" y="72" width="45" height="3" fill={color} opacity="0.6" />
      </motion.g>
      
      {/* Stand */}
      <motion.path 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        d="M100 100 L100 120 L80 120 L120 120" 
        stroke={color} strokeWidth="3" fill="transparent" 
      />
      
      {/* Base */}
      <motion.rect 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        x="70" y="120" width="60" height="5" rx="2" 
        fill={color} 
      />
    </svg>
  </motion.div>
);

// Mobile App Development Illustration
export const MobileDevIllustration = ({ color = 'var(--primary-color)' }) => (
  <motion.div 
    className="illustration mobile-dev"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      {/* Phone */}
      <motion.rect 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
        x="70" y="20" width="60" height="110" rx="10" 
        stroke={color} strokeWidth="3" fill="transparent" 
      />
      
      {/* Screen */}
      <motion.rect 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        x="75" y="30" width="50" height="80" 
        fill="rgba(var(--primary-color-rgb), 0.1)" 
      />
      
      {/* App interface */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <rect x="80" y="35" width="40" height="8" rx="2" fill={color} opacity="0.5" />
        <circle cx="85" cy="55" r="5" fill={color} />
        <circle cx="100" cy="55" r="5" fill={color} opacity="0.7" />
        <circle cx="115" cy="55" r="5" fill={color} opacity="0.4" />
        <rect x="80" y="70" width="40" height="5" rx="1" fill={color} opacity="0.6" />
        <rect x="80" y="80" width="40" height="5" rx="1" fill={color} opacity="0.6" />
        <rect x="80" y="90" width="40" height="5" rx="1" fill={color} opacity="0.6" />
      </motion.g>
      
      {/* Home button */}
      <motion.circle 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        cx="100" cy="120" r="5" 
        stroke={color} strokeWidth="2" fill="transparent" 
      />
    </svg>
  </motion.div>
);

// Data Science Illustration
export const DataScienceIllustration = ({ color = 'var(--primary-color)' }) => (
  <motion.div 
    className="illustration data-science"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      {/* Bar chart */}
      <motion.rect 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        x="40" y="70" width="20" height="50" 
        fill={color} opacity="0.8" 
        transformOrigin="40px 120px"
      />
      <motion.rect 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        x="70" y="40" width="20" height="80" 
        fill={color} 
        transformOrigin="70px 120px"
      />
      <motion.rect 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        x="100" y="60" width="20" height="60" 
        fill={color} opacity="0.6" 
        transformOrigin="100px 120px"
      />
      <motion.rect 
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        x="130" y="90" width="20" height="30" 
        fill={color} opacity="0.4" 
        transformOrigin="130px 120px"
      />
      
      {/* X axis */}
      <motion.line 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        x1="30" y1="120" x2="160" y2="120" 
        stroke={color} strokeWidth="2" 
      />
      
      {/* Y axis */}
      <motion.line 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        x1="30" y1="30" x2="30" y2="120" 
        stroke={color} strokeWidth="2" 
      />
      
      {/* Data points for scatter plot */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5, staggerChildren: 0.1 }}
      >
        <circle cx="50" cy="50" r="3" fill={color} />
        <circle cx="60" cy="70" r="3" fill={color} />
        <circle cx="70" cy="40" r="3" fill={color} />
        <circle cx="90" cy="60" r="3" fill={color} />
        <circle cx="100" cy="50" r="3" fill={color} />
        <circle cx="120" cy="65" r="3" fill={color} />
        <circle cx="140" cy="55" r="3" fill={color} />
      </motion.g>
      
      {/* Trend line */}
      <motion.path 
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8 }}
        d="M50,50 Q80,30 110,50 T140,55" 
        stroke={color} strokeWidth="2" fill="transparent" 
      />
    </svg>
  </motion.div>
);

// UI/UX Design Illustration
export const DesignIllustration = ({ color = 'var(--primary-color)' }) => (
  <motion.div 
    className="illustration design"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      {/* Design Board */}
      <motion.rect 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        x="30" y="20" width="140" height="100" rx="5" 
        fill="rgba(var(--primary-color-rgb), 0.1)" 
        stroke={color} strokeWidth="2" 
      />
      
      {/* Color palette */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        transformOrigin="50px 40px"
      >
        <circle cx="45" cy="40" r="8" fill={color} />
        <circle cx="65" cy="40" r="8" fill={color} opacity="0.7" />
        <circle cx="85" cy="40" r="8" fill={color} opacity="0.5" />
        <circle cx="105" cy="40" r="8" fill={color} opacity="0.3" />
      </motion.g>
      
      {/* UI Elements */}
      <motion.g
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        {/* Header */}
        <rect x="50" y="60" width="100" height="10" rx="2" fill={color} opacity="0.8" />
        
        {/* Content blocks */}
        <rect x="50" y="80" width="40" height="25" rx="2" fill={color} opacity="0.6" />
        <rect x="100" y="80" width="50" height="25" rx="2" fill={color} opacity="0.5" />
        
        {/* Footer */}
        <rect x="50" y="115" width="100" height="5" rx="2" fill={color} opacity="0.7" />
      </motion.g>
      
      {/* Pencil */}
      <motion.g
        initial={{ rotate: -45, x: 50, opacity: 0 }}
        animate={{ rotate: 0, x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
        transformOrigin="150px 90px"
      >
        <rect x="135" y="70" width="30" height="5" rx="1" fill={color} />
        <polygon points="135,70 135,75 125,72.5" fill={color} />
        <rect x="165" y="70" width="5" height="5" rx="1" fill={color} opacity="0.5" />
      </motion.g>
    </svg>
  </motion.div>
);

// Main component that contains all illustrations
const CustomIllustrations = {
  WebDevIllustration,
  MobileDevIllustration,
  DataScienceIllustration,
  DesignIllustration
};

export default CustomIllustrations; 