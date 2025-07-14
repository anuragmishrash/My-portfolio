import React from 'react';
import Hero from '../components/UI/Hero';
import About from '../components/UI/About';
import Skills from '../components/UI/Skills';
import Projects from '../components/UI/Projects';
import Certifications from '../components/UI/Certifications';
import Contact from '../components/UI/Contact';

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </div>
  );
};

export default HomePage; 