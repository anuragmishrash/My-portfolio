import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check if user has previously set theme preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
    
    // Set CSS variables for theme transition
    document.documentElement.style.setProperty('--theme-transition', 'all 0.5s ease');
  }, []);

  // Toggle theme with transition
  const toggleTheme = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
    setIsDarkMode(!isDarkMode);
    
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 50);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easy theme access
export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider; 