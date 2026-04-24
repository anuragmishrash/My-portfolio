import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatAssistant.scss';
import { knowledgeBase } from '../../utils/chatbotData';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "👋 Hi! I'm Anurag's AI portfolio assistant. I can help you explore his projects, skills, internships, or answer questions about his experience. Want to learn about FeedScope AI or navigate the portfolio?",
      isBot: true 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Fuzzy matching helper - handles typos and variations
  const matchesKeyword = (query, ...keywords) => {
    return keywords.some(keyword => 
      query.includes(keyword) || 
      keyword.includes(query.substring(0, 3)) ||
      levenshteinDistance(query, keyword) <= 2 // Handle typos
    );
  };

  // Levenshtein distance for typo tolerance
  const levenshteinDistance = (str1, str2) => {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null)
    );
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1,
          track[j - 1][i] + 1,
          track[j - 1][i - 1] + indicator
        );
      }
    }
    return track[str2.length][str1.length];
  };

  const processNavigation = (command) => {
    const commandLower = command.toLowerCase();
    const sections = {
      "home": "home",
      "hero": "home",
      "about": "about",
      "skill": "skills",
      "project": "projects",
      "port": "projects",
      "intern": "internships",
      "certif": "certifications",
      "cert": "certifications",
      "contact": "contact",
      "get": "contact",
      "reach": "contact"
    };

    let targetSection = null;
    for (const [key, section] of Object.entries(sections)) {
      if (commandLower.includes(key)) {
        targetSection = section;
        break;
      }
    }

    if (commandLower.includes("resume") || commandLower.includes("cv")) {
      window.open('Resume Anurag Mishra.pdf', '_blank');
      return "📄 Opening resume in a new tab!";
    }

    if (targetSection) {
      const sectionElement = document.getElementById(targetSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        return `✨ Navigating to ${targetSection} section...`;
      }
    }

    return "I didn't catch that. Try: 'Navigate to projects', 'Show me skills', 'Contact', 'Resume', or 'About'.";
  };

  const addMessage = (text, isBot = false) => {
    setMessages(prev => [...prev, { text, isBot }]);
  };

  const generateResponse = (query) => {
    const queryLower = query.toLowerCase();

    // Navigation commands
    if (queryLower.match(/^(navigate|go|show|take|open|scroll|visit)/)) {
      return processNavigation(query);
    }

    // Greetings
    if (queryLower.match(/^(hi|hello|hey|greet|sup|wassup)/)) {
      return "👋 Hey there! I'm Anurag's AI assistant. I can tell you about:\n• FeedScope AI (his flagship AI project) ⭐\n• His internship experience\n• Skills and tech stack\n• Projects and achievements\n• How to contact him\n\nWhat interests you?";
    }

    // =======================================
    // FEEDSCOPE AI - FLAGSHIP PROJECT
    // =======================================
    if (matchesKeyword(queryLower, "feedscope", "feedback", "sentiment", "ai", "flagship", "feed", "scope")) {
      const feedscope = knowledgeBase.projects[0];
      return `🌟 **${feedscope.name}** - ${feedscope.type}

${feedscope.description}

🏆 **Key Achievements:**
• **92.4%** sentiment analysis accuracy
• **58ms** Socket.io real-time latency
• **73.6%** cache hit rate
• Multilingual (Hindi + English) support
• Google Gemini 2.5 Flash AI integration
• IEEE research paper with 15 references

🛠️ **Tech Stack:**
Frontend: React 18 + Vite + Tailwind CSS + Framer Motion
Backend: Node.js + Express + Socket.io
Database: MongoDB Atlas
AI: Python FastAPI + HuggingFace XLM-RoBERTa + Google Gemini 2.5 Flash

✨ **Key Features:**
${feedscope.features.slice(0, 5).map(f => "• " + f).join("\n")}

📖 **Academic Value:** IEEE paper + SPSU presentation

🔗 GitHub: ${feedscope.links.github}
🚀 Live Demo: ${feedscope.links.demo}

This is my best work - full-stack MERN with AI! Want to know more about any specific part?`;
    }

    // =======================================
    // APPOINTMENT SCHEDULER
    // =======================================
    if (matchesKeyword(queryLower, "appointment", "scheduler", "booking", "celebal")) {
      const project = knowledgeBase.projects[1];
      return `📅 **${project.name}** - ${project.type}

${project.description}

📌 **Key Features:**
${project.features.slice(0, 5).map(f => "• " + f).join("\n")}

🛠️ **Technologies:** ${project.technologies.slice(0, 8).join(", ")}

✅ Built during Celebal Technologies internship (May-Aug 2024)
🔗 **GitHub:** ${project.links.github}
🚀 **Live Demo:** ${project.links.demo}

This project shows my MERN expertise with JWT auth and RBAC!`;
    }

    // =======================================
    // TASKFLOW
    // =======================================
    if (matchesKeyword(queryLower, "taskflow", "task", "collaboration", "real-time", "socket")) {
      const project = knowledgeBase.projects[2];
      return `⚡ **${project.name}** - ${project.type}

${project.description}

📌 **Key Features:**
${project.features.slice(0, 5).map(f => "• " + f).join("\n")}

🛠️ **Technologies:** ${project.technologies.slice(0, 8).join(", ")}

This project demonstrates real-time web application skills with Socket.io!
🔗 **GitHub:** ${project.links.github}
🚀 **Live Demo:** ${project.links.demo}`;
    }

    // =======================================
    // SMART BOOKMARK
    // =======================================
    if (matchesKeyword(queryLower, "bookmark", "smart", "sync")) {
      const project = knowledgeBase.projects[3];
      return `🔖 **${project.name}** - ${project.type}

${project.description}

📌 **Key Features:**
${project.features.slice(0, 5).map(f => "• " + f).join("\n")}

🛠️ **Technologies:** ${project.technologies.slice(0, 8).join(", ")}

🔗 **GitHub:** ${project.links.github}
🚀 **Live Demo:** ${project.links.demo}`;
    }

    // =======================================
    // TALENCEE - JOB PORTAL
    // =======================================
    if (matchesKeyword(queryLower, "talencee", "job", "portal", "career")) {
      const project = knowledgeBase.projects[4];
      return `💼 **${project.name}** - ${project.type}

${project.description}

📌 **Key Features:**
${project.features.slice(0, 5).map(f => "• " + f).join("\n")}

🛠️ **Technologies:** ${project.technologies.slice(0, 8).join(", ")}

🔗 **GitHub:** ${project.links.github}
🚀 **Live Demo:** ${project.links.demo}`;
    }

    // =======================================
    // GOLFGIVES
    // =======================================
    if (matchesKeyword(queryLower, 'golfgives', 'golf', 'golf gives', 'subscription', 'stripe', 'draw', 'charity', 'prize')) {
      return "GolfGives is a full-stack subscription platform combining golf performance tracking, charity fundraising, and a monthly prize draw engine. Built with React, Node.js, MongoDB, and Stripe for payments. Features include JWT-based RBAC with subscriber and admin roles, Stripe webhook integration, a custom draw engine with jackpot rollover, real-time admin dashboard, and transactional emails via Resend. Deployed on Vercel with a Railway backend.\nLive: https://golf-gives-theta.vercel.app/ | GitHub: https://github.com/anuragmishrash/GolfGives";
    }

    // =======================================
    // PROJECTS (General)
    // =======================================
    if (matchesKeyword(queryLower, "project", "built", "portfolio", "work", "develop")) {
      return `🎯 **Anurag's Projects:**

1. **FeedScope AI** ⭐ (Flagship!)
   Full-stack AI feedback platform with 92.4% accuracy
   React + Node.js + MongoDB + Python AI
   → Ask "Tell me about FeedScope AI"

2. **Appointment Scheduler**
   MERN booking system (Celebal internship)
   Production-ready with RBAC
   → Ask "Tell me about Appointment Scheduler"

3. **TaskFlow**
   Real-time collaboration with Socket.io
   Live dashboard with RBAC
   → Ask "Tell me about TaskFlow"
   
4. **Smart Bookmark**
   Next.js 15 app with real-time Supabase sync
   → Ask "Tell me about Smart Bookmark"

5. **Talencee Job Portal**
   Full-stack MERN job portal with CMS admin
   → Ask "Tell me about Talencee"

6. **GolfGives**
   Golf performance & charity platform with Stripe
   → Ask "Tell me about GolfGives"

7. **SPSU Marketplace**
   Campus item exchange platform
   → Ask "Tell me about SPSU Marketplace"

Which one interests you? I can provide detailed info!`;
    }

    // =======================================
    // INTERNSHIPS
    // =======================================
    if (matchesKeyword(queryLower, "intern", "experience", "work", "celebal", "ineuby", "ineubyte")) {
      const int1 = knowledgeBase.internships[0];
      const int2 = knowledgeBase.internships[1];
      return `🏢 **Anurag's Internships:**

**1. Node.js Developer @ ${int1.company}**
   Duration: ${int1.duration} (${int1.durationMonths} months)
   Project: Appointment Scheduler (Full-stack MERN)
   Skills: Node.js, Express, MongoDB, JWT, RBAC
   Mentors: Priyanshi Ma'am, Prerna Kamat Ma'am, Sarthak Acharjee Sir
   📜 Certificate: ${int1.certificate}

**2. Web Development @ ${int2.company}**
   Duration: ${int2.duration} (${int2.durationMonths} months)
   Projects: News Search Platform, AI Fake-News Detection
   Skills: React, JavaScript, AI Integration, Flask APIs
   Mentor: Geetha Pratyusha
   📜 Certificate: ${int2.certificate}

Both are AICTE-approved with production experience!`;
    }

    // =======================================
    // SKILLS
    // =======================================
    if (matchesKeyword(queryLower, "skill", "know", "tech", "language", "programming", "stack", "expert")) {
      return `💻 **Anurag's Tech Stack:**

**Languages:**
${knowledgeBase.skills.languages.map(s => `• ${s.name} (${s.percentage}%)`).join("\n")}

**Frontend:** React.js (90%), Tailwind CSS, Framer Motion
**Backend:** Node.js (85%), Express.js (85%), REST APIs (90%)
**Database:** MongoDB (80%), MySQL (75%)
**Real-time:** Socket.io (85%), JWT Auth (85%)
**AI/ML:** HuggingFace, Google Gemini API (80%)

**Tools:** ${knowledgeBase.skills.tools.slice(0, 10).join(", ")}...

**Soft Skills:** ${knowledgeBase.skills.soft.map(s => s.name).join(", ")}

📊 **Expertise Summary:**
Full-stack MERN expert with AI/ML integration experience!`;
    }

    // =======================================
    // RECRUITER PITCHES
    // =======================================
    if (matchesKeyword(queryLower, "hire", "role", "opportunity", "position", "job", "recruitment", "apply", "salary")) {
      return `🎯 **Why Hire Anurag?**

✅ **Experience:** 2 AICTE-approved internships (Celebal, iNeuBytes)
✅ **Flagship Project:** FeedScope AI with 92.4% accuracy + AI integration
✅ **Full-Stack:** React + Node.js + Express + MongoDB expert
✅ **Real-time:** Socket.io, JWT Auth, RBAC expertise
✅ **AI-Integrated:** HuggingFace & Google Gemini API experience
✅ **Academic:** B.Tech CSE, SPSU (Graduating May 2026, CGPA 7.6)
✅ **Production-Ready:** All projects deployed on Vercel
✅ **Research:** IEEE research paper author (FeedScope AI)

🎯 **Looking For:** SDE-1, Full-Stack Developer, Node.js, React roles
💰 **Salary Floor:** ₹4 LPA
📅 **Availability:** Immediate to June 2026

📧 Email: ${knowledgeBase.contact.email}
📱 Phone: ${knowledgeBase.contact.phone}
💼 LinkedIn: ${knowledgeBase.contact.linkedin}
🐙 GitHub: ${knowledgeBase.contact.github}`;
    }

    // =======================================
    // ABOUT / BIO
    // =======================================
    if (matchesKeyword(queryLower, "about", "who", "anurag", "intro", "background", "bio")) {
      return `👤 **About Anurag Mishra**

${knowledgeBase.about}

🎓 **Education:**
• B.Tech Computer Science Engineering
• Sir Padampat Singhania University (SPSU), Udaipur
• Expected Graduation: May 2026
• CGPA: ${knowledgeBase.education.cgpa}/${knowledgeBase.education.cgpaMax}

🏆 **Key Highlights:**
• Built FeedScope AI (92.4% sentiment accuracy)
• 2 production internships
• Full-stack MERN expert
• AI/ML integration experience
• IEEE research paper author

📍 **Location:** ${knowledgeBase.contact.location}

Want to know more about projects, skills, or internships?`;
    }

    // =======================================
    // CONTACT
    // =======================================
    if (matchesKeyword(queryLower, "contact", "email", "reach", "linkedin", "github", "phone", "message", "connect")) {
      return `📞 **Get in Touch with Anurag:**

📧 **Email:** ${knowledgeBase.contact.email}
📱 **Phone:** ${knowledgeBase.contact.phone}
💼 **LinkedIn:** ${knowledgeBase.contact.linkedin}
🐙 **GitHub:** ${knowledgeBase.contact.github}
📍 **Location:** ${knowledgeBase.contact.location}

Or use the contact form in the Contact section!
🧭 Type 'Navigate to Contact' to go to contact form`;
    }

    // =======================================
    // EDUCATION
    // =======================================
    if (matchesKeyword(queryLower, "education", "college", "university", "degree", "spsu", "graduation")) {
      return `🎓 **Education:**

**Degree:** ${knowledgeBase.education.degree}
**University:** ${knowledgeBase.education.university}
**Location:** ${knowledgeBase.education.location}
**Expected Graduation:** ${knowledgeBase.education.graduationDate}
**CGPA:** ${knowledgeBase.education.cgpa}/${knowledgeBase.education.cgpaMax}

Final-year student actively pursuing SDE-1 and Full-Stack Developer roles.`;
    }

    // =======================================
    // HELP / COMMANDS
    // =======================================
    if (matchesKeyword(queryLower, "help", "command", "navigate", "what can", "guide")) {
      return `ℹ️ **Here's what I can help with:**

📌 **Ask me about:**
• "Tell me about FeedScope AI" ⭐ (Flagship project)
• "What projects have you built?"
• "Show me your internship experience"
• "What's your tech stack?"
• "Why should I hire you?" (for recruiters)
• "How do I contact you?"
• "Tell me about your education"
• "What are your skills?"

🧭 **Navigation commands:**
• "Navigate to projects"
• "Show me skills"
• "Take me to contact"
• "Open resume"
• "Go to about"

💡 **Pro tips:**
• I understand variations (e.g., "feedback AI" finds "FeedScope AI")
• Ask follow-up questions
• Type "help" anytime

Let me know how I can assist! 😊`;
    }

    // =======================================
    // ACHIEVEMENTS & METRICS
    // =======================================
    if (matchesKeyword(queryLower, "metric", "achievement", "accuracy", "latency", "performance", "stat")) {
      return `🏆 **Anurag's Key Achievements & Metrics:**

**FeedScope AI:**
• 92.4% sentiment analysis accuracy
• 58ms Socket.io real-time latency
• 73.6% cache hit rate
• Multilingual support (Hindi + English)
• IEEE research paper (15 references)
• Google Gemini 2.5 Flash integration

**Internships:**
• 2 AICTE-approved internships (6 months total)
• Celebal Technologies: Built production Appointment Scheduler
• iNeuBytes: AI model integration + News platform

**Academic:**
• CGPA: 7.6/10
• Final year (Graduating May 2026)
• IEEE research paper author
• Project supervisor: Prof. Dipesh Vaya

Impressive metrics, right? 😊`;
    }

    // =======================================
    // DEFAULT
    // =======================================
    return `Hmm, I'm not quite sure about that. Here's what I can help with:

📌 **Popular questions:**
• "Tell me about FeedScope AI"
• "What's your tech stack?"
• "Show me your projects"
• "Internship experience?"
• "Why should I hire you?"

🧭 **Commands:**
• "Navigate to projects"
• "Show contact"
• "Open resume"

Or type 'help' for all options!`;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    addMessage(inputValue);
    
    setTimeout(() => {
      const response = generateResponse(inputValue);
      addMessage(response, true);
    }, 600);

    setInputValue('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <AnimatePresence>
        <motion.button 
          className={`chat-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleChat}
          aria-label="Toggle chat assistant"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3
            }}
          >
            <FaRobot />
          </motion.div>
        </motion.button>
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-assistant open"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chat-header">
              <div className="chat-title">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, 0, -15, 0],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <FaRobot />
                </motion.div>
                <span>Portfolio Assistant</span>
                <span className="badge">⭐ Smart AI</span>
              </div>
              <button className="close-btn" onClick={toggleChat}>
                <FaTimes />
              </button>
            </div>
            
            <div className="chat-messages">
              {messages.map((message, index) => (
                <motion.div 
                  key={index} 
                  className={`message ${message.isBot ? 'bot' : 'user'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.isBot && (
                    <motion.div 
                      className="bot-icon"
                      initial={{ rotate: -30 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaRobot />
                    </motion.div>
                  )}
                  {!message.isBot && (
                    <div className="user-icon">
                      <FaUser />
                    </div>
                  )}
                  <div className="message-content">
                    {message.text.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < message.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <form className="chat-input" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ask about FeedScope AI, projects, or type 'help'..."
                value={inputValue}
                onChange={handleInputChange}
                ref={inputRef}
              />
              <motion.button 
                type="submit" 
                className="send-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;