import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import './CustomCursor.scss';
import { FaArrowUp } from 'react-icons/fa';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [cursorState, setCursorState] = useState({
    linkHovered: false,
    buttonHovered: false,
    inputHovered: false,
    textHovered: false,
    cursorText: ''
  });
  
  // Removed showScrollTop state as we're removing the ScrollTopButton

  // Throttle function to improve performance
  const throttle = (callback, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };

  useEffect(() => {
    // Throttled update position function
    const updatePosition = throttle((e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }, 10); // 10ms throttle for smoother performance

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Combined hover handler to reduce individual event listeners
    const handleElementHover = (e) => {
      const target = e.target;
      const isLink = target.tagName === 'A' || target.classList.contains('tilt-wrapper');
      const isButton = target.tagName === 'BUTTON' || target.classList.contains('btn');
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      const isText = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN'].includes(target.tagName);
      
      // Only update state if something changed
      if (isLink || isButton || isInput || isText) {
        let cursorText = '';
        
        if (target.getAttribute('data-cursor-text')) {
          cursorText = target.getAttribute('data-cursor-text');
        } else if (isLink && target.getAttribute('href')) {
          cursorText = 'View';
        } else if (isButton) {
          cursorText = 'Click';
        } else if (isInput) {
          cursorText = 'Type';
        }
        
        setCursorState({
          linkHovered: isLink,
          buttonHovered: isButton,
          inputHovered: isInput,
          textHovered: isText,
          cursorText
        });
      }
    };
    
    const handleElementLeave = () => {
      setCursorState({
        linkHovered: false,
        buttonHovered: false,
        inputHovered: false,
        textHovered: false,
        cursorText: ''
      });
    };

    // Removed handleScroll function since we're removing ScrollTopButton

    // Add event delegation instead of multiple listeners
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Use event delegation for hover effects
    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseout', handleElementLeave);
    
    // Removed scroll event listener

    // Simplified magnetic effect with event delegation
    document.addEventListener('mousemove', (e) => {
      const magneticElements = document.querySelectorAll('.btn, .hero-social a, .btn-glow, .btn-outline-animated');
      
      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        
        // Only apply effect if mouse is over the element
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const distanceX = x - centerX;
          const distanceY = y - centerY;
          
          element.style.transform = `translate(${distanceX / 8}px, ${distanceY / 8}px)`;
        } else if (element.style.transform) {
          element.style.transform = '';
        }
      });
    }, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseout', handleElementLeave);
      // Removed scroll event listener cleanup
    };
  }, [cursorX, cursorY]);

  // Removed scrollToTop function
  // Removed ScrollTopButton component

  // Only render custom cursor on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Don't render ScrollTopButton anymore
  }

  const { linkHovered, buttonHovered, inputHovered, textHovered, cursorText } = cursorState;

  return (
    <>
      <motion.div
        ref={cursorDotRef}
        className={`cursor-dot ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          scale: clicked ? 0.7 : 1
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15
        }}
      />
      <motion.div
        ref={cursorOutlineRef}
        className={`cursor-outline ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${
          linkHovered ? 'link-hovered' : ''
        } ${buttonHovered ? 'button-hovered' : ''} ${inputHovered ? 'input-hovered' : ''} ${
          textHovered ? 'text-hovered' : ''
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          scale: clicked ? 0.9 : linkHovered || buttonHovered ? 1.5 : 1
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.2
        }}
      >
        {(linkHovered || buttonHovered || inputHovered) && cursorText && (
          <span className="cursor-text">{cursorText}</span>
        )}
      </motion.div>
      
      {/* Removed ScrollTopButton */}
    </>
  );
};

export default CustomCursor; 