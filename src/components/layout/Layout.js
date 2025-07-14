import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../UI/CustomCursor';
import BackToTop from '../UI/BackToTop';
import ChatAssistant from '../UI/ChatAssistant';
import './Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <CustomCursor />
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <BackToTop />
      <ChatAssistant />
    </div>
  );
};

export default Layout; 