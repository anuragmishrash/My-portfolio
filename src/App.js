import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import InternshipsPage from './pages/InternshipsPage';
import CertificationsPage from './pages/CertificationsPage';
import ContactPage from './pages/ContactPage';
import CustomLoader from './components/UI/CustomLoader';
import './assets/styles/global.scss';
import './assets/styles/mobile-overrides.scss';

// AnimatedRoutes component for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    // Cleanup
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <ThemeProvider>
      <CustomLoader isLoading={loading} />
      <Router>
        <Layout>
          {!loading && <AnimatedRoutes />}
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
