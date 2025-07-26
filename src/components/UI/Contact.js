import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });
  
  const formRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: true,
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Show loading state
    setFormStatus({
      submitted: false,
      error: false,
      message: 'Sending your message...'
    });
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || `Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:itsanuragmishra99@gmail.com?subject=${subject}&body=${body}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Your email client should open with the message. If not, please contact me directly at itsanuragmishra99@gmail.com.'
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset form status after 8 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        error: false,
        message: ''
      });
    }, 8000);
  };
  
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      text: 'SPSU, Udaipur, Rajasthan',
      link: 'https://maps.google.com/?q=SPSU+Udaipur'
    },
    {
      icon: <FaEnvelope />,
      text: 'itsanuragmishra99@gmail.com',
      link: 'mailto:itsanuragmishra99@gmail.com'
    },
    {
      icon: <FaPhone />,
      text: '+91 9461132447',
      link: 'tel:+919461132447'
    },
    {
      icon: <FaLinkedinIn />,
      text: 'Anurag Mishra',
      link: 'https://www.linkedin.com/in/anurag-mishra-218b94252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'
    },
    {
      icon: <FaInstagram />,
      text: 'its_anurag.m',
      link: 'https://www.instagram.com/its_anurag.m?igsh=MWwwZHNjbTkzMml6Zw=='
    }
  ];
  
  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>Feel free to reach out if you have any questions or want to work together</p>
        </div>
        
        <div className="contact-container">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Contact Information</h3>
            <p>
              I'm currently available for freelance work, internships, and collaborative projects. 
              Drop me a message, and I'll get back to you as soon as possible.
            </p>
            
            <ul className="info-list">
              {contactInfo.map((info, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="icon">{info.icon}</div>
                  <div className="text">
                    <a href={info.link} target="_blank" rel="noopener noreferrer">
                      {info.text}
                    </a>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Send Me a Message</h3>
            
            {formStatus.message && (
              <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
                {formStatus.message}
              </div>
            )}
            
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
              
              <div className="input-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 