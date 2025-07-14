import React, { useEffect, useState } from 'react';
import './CustomCursor.scss';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    const handleLinkHoverStart = () => {
      setLinkHovered(true);
    };

    const handleLinkHoverEnd = () => {
      setLinkHovered(false);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover effect on links, buttons and clickable elements
    const links = document.querySelectorAll('a, button, input[type="submit"], .tilt-wrapper');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  // Only render custom cursor on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div
        className={`cursor-dot ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div
        className={`cursor-outline ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${
          linkHovered ? 'link-hovered' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  );
};

export default CustomCursor; 