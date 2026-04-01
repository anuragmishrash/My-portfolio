import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedinIn, FaInstagram, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.scss';

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Initialize EmailJS with your public key
  React.useEffect(() => {
    emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Please enter a message');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_gmail',
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_contact_form',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || 'Portfolio Contact Form',
          message: formData.message,
          to_email: 'itsanuragmishra99@gmail.com'
        }
      );

      if (response.status === 200) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 6000);
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send message. Please email me directly at itsanuragmishra99@gmail.com');
    } finally {
      setLoading(false);
    }
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
          <p>Feel free to reach out for opportunities or just a friendly chat</p>
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

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="success-message"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaCheckCircle className="success-icon" />
                  <h3>Message Sent! ✨</h3>
                  <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {error && (
                    <motion.div
                      className="form-message error-banner"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FaExclamationCircle /> {error}
                    </motion.div>
                  )}

                  <div className="input-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject (Optional)"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="input-group">
                    <textarea
                      name="message"
                      placeholder="Your Message *"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.03 }}
                    whileTap={{ scale: loading ? 1 : 0.97 }}
                  >
                    {loading ? (
                      <><span className="spinner"></span> Sending...</>
                    ) : (
                      <><FaPaperPlane /> Send Message</>
                    )}
                  </motion.button>

                  <p className="form-note">
                    Can't reach me here? Email directly:{' '}
                    <a href="mailto:itsanuragmishra99@gmail.com">itsanuragmishra99@gmail.com</a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;