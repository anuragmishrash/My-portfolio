import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../../contexts/ThemeContext';
import './Navbar.scss';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenu = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [isMenuOpen]);

  // Add scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent event propagation when clicking on the menu
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <h2>Anurag Mishra</h2>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`} onClick={handleMenuClick}>
          <button className="navbar-close" onClick={toggleMenu}>
            <FaTimes />
          </button>
          <nav>
            <ul className="navbar-links">
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
              <li><Link to="/skills" onClick={toggleMenu}>Skills</Link></li>
              <li><Link to="/projects" onClick={toggleMenu}>Projects</Link></li>
              <li><Link to="/certifications" onClick={toggleMenu}>Certifications</Link></li>
              <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          </nav>
        </div>

        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 