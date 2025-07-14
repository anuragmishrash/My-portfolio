import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import './ChatAssistant.scss';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hi there! I'm Anurag's portfolio assistant. Ask me anything about Anurag's skills, projects, or experience! You can also navigate the site by typing 'navigate to [section]'", 
      isBot: true 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Knowledge base about Anurag's portfolio
  const knowledgeBase = {
    // Personal info
    name: "Anurag Mishra",
    role: "Computer Science Undergraduate",
    about: "I'm a full-stack developer with experience in cybersecurity and AI integration. Currently pursuing B.Tech at SPSU, Udaipur with a focus on creating modern web applications.",
    
    // Projects
    projects: [
      {
        name: "Appointment Scheduler",
        description: "An interactive web application for scheduling and managing appointments with a user-friendly interface. The platform offers separate dashboards for businesses and clients with real-time availability management.",
        technologies: ["React.js", "Node.js", "Express", "MongoDB", "JWT Authentication"],
        features: [
          "User authentication and profile management",
          "Business service and availability management",
          "Appointment booking, rescheduling and tracking",
          "Calendar integration with real-time updates",
          "Responsive design for mobile and desktop"
        ]
      },
      {
        name: "SPSU Marketplace",
        description: "A peer-to-peer campus item exchange platform allowing students to buy, sell, and trade items within the university community.",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
        features: [
          "Implemented user authentication and profile management",
          "Created secure transaction system with messaging functionality",
          "Designed responsive interface for mobile and desktop",
          "Built RESTful API endpoints for frontend integration"
        ]
      },
      {
        name: "Blockchain-based E-Waste Management",
        description: "An Ethereum-powered solution for tracking and managing electronic waste sustainably with transparent record-keeping.",
        technologies: ["Solidity", "Ganache", "MetaMask", "HTML", "CSS", "JavaScript", "Node.js"],
        features: [
          "Developed smart contracts for secure e-waste tracking",
          "Integrated MetaMask for blockchain interactions",
          "Created dashboard for visualizing waste flow and recycling metrics",
          "Implemented reward system for responsible e-waste disposal"
        ]
      }
    ],
    
    // Skills categorized
    skills: {
      languages: ["JavaScript", "C++", "Java", "Python", "HTML/CSS", "Solidity"],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "RESTful APIs", "Web3.js", "AI/ML Integration"],
      tools: ["MERN Stack", "Git", "GitHub", "VS Code", "Postman", "Blockchain", "Web3", "TensorFlow", "NPM", "Webpack", "Docker", "Heroku", "Vercel", "AWS"],
      soft: ["Problem Solving", "Communication", "Team Collaboration", "Time Management"]
    },
    
    // Contact information
    contact: {
      email: "itsanuragmishra99@gmail.com",
      linkedin: "https://www.linkedin.com/in/anurag-mishra",
      github: "https://github.com/anuragmishrash",
    }
  };

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Process navigation commands
  const processNavigation = (command) => {
    const commandLower = command.toLowerCase();
    let section = null;
    
    if (commandLower.includes("home")) section = "home";
    else if (commandLower.includes("about")) section = "about";
    else if (commandLower.includes("skills")) section = "skills";
    else if (commandLower.includes("projects")) section = "projects";
    else if (commandLower.includes("certifications")) section = "certifications";
    else if (commandLower.includes("contact")) section = "contact";
    else if (commandLower.includes("resume")) {
      // Open resume in new tab
      window.open('resume.pdf', '_blank');
      return "Opening resume in a new tab";
    }
    
    if (section) {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
        return `Navigating to ${section} section`;
      } else {
        return `Sorry, I couldn't find the ${section} section`;
      }
    } else {
      return "I didn't recognize that navigation command. Try typing 'Navigate to projects' or similar.";
    }
  };

  const addMessage = (text, isBot = false) => {
    setMessages(prev => [...prev, { text, isBot }]);
  };

  const generateResponse = (query) => {
    // Convert query to lowercase for easier matching
    const queryLower = query.toLowerCase();
    
    // Check for navigation commands - enhanced to catch more variations
    if (queryLower.startsWith("navigate to") || 
        queryLower.startsWith("go to") || 
        queryLower.startsWith("show") || 
        queryLower.startsWith("take me to") ||
        queryLower.startsWith("open") ||
        queryLower.includes("scroll to")) {
      return processNavigation(query);
    }
    
    // Check for greetings
    if (queryLower.match(/^(hi|hello|hey|greetings).*/)) {
      return "Hello there! How can I help you with Anurag's portfolio today?";
    }
    
    // Check for project information
    if (queryLower.includes("project") || queryLower.includes("work") || queryLower.includes("portfolio")) {
      if (queryLower.includes("appointment") || queryLower.includes("scheduler")) {
        const project = knowledgeBase.projects.find(p => p.name.toLowerCase().includes("appointment"));
        return `${project.name}: ${project.description}\n\nTechnologies used: ${project.technologies.join(", ")}\n\nKey features:\n${project.features.map(f => "• " + f).join("\n")}`;
      }
      
      if (queryLower.includes("marketplace") || queryLower.includes("spsu")) {
        const project = knowledgeBase.projects.find(p => p.name.toLowerCase().includes("marketplace"));
        return `${project.name}: ${project.description}\n\nTechnologies used: ${project.technologies.join(", ")}\n\nKey features:\n${project.features.map(f => "• " + f).join("\n")}`;
      }
      
      if (queryLower.includes("blockchain") || queryLower.includes("waste") || queryLower.includes("e-waste")) {
        const project = knowledgeBase.projects.find(p => p.name.toLowerCase().includes("blockchain"));
        return `${project.name}: ${project.description}\n\nTechnologies used: ${project.technologies.join(", ")}\n\nKey features:\n${project.features.map(f => "• " + f).join("\n")}`;
      }
      
      // General project question
      return `Anurag has worked on several projects including:\n\n${knowledgeBase.projects.map(p => "• " + p.name).join("\n")}\n\nAsk me about a specific project for more details!`;
    }
    
    // Check for skills information
    if (queryLower.includes("skill") || queryLower.includes("know") || queryLower.includes("tech") || 
        queryLower.includes("language") || queryLower.includes("programming")) {
      
      // Check for specific skill categories
      if (queryLower.includes("language") || queryLower.includes("programming")) {
        return `Anurag's programming languages include: ${knowledgeBase.skills.languages.join(", ")}`;
      }
      
      if (queryLower.includes("tech") || queryLower.includes("framework")) {
        return `Anurag's technologies and frameworks include: ${knowledgeBase.skills.technologies.join(", ")}`;
      }
      
      if (queryLower.includes("tool")) {
        return `Anurag's tools and ecosystems include: ${knowledgeBase.skills.tools.join(", ")}`;
      }
      
      if (queryLower.includes("soft") || queryLower.includes("professional")) {
        return `Anurag's professional skills include: ${knowledgeBase.skills.soft.join(", ")}`;
      }
      
      // General skills question
      return `Anurag has skills in:\n\n• Programming languages: ${knowledgeBase.skills.languages.join(", ")}\n\n• Technologies: ${knowledgeBase.skills.technologies.join(", ")}\n\n• Tools & Ecosystems: ${knowledgeBase.skills.tools.join(", ")}\n\n• Professional skills: ${knowledgeBase.skills.soft.join(", ")}`;
    }
    
    // Check for about/bio information
    if (queryLower.includes("about") || queryLower.includes("who") || queryLower.includes("anurag") || 
        queryLower.includes("introduction") || queryLower.includes("background") || queryLower.includes("bio")) {
      return `${knowledgeBase.name} is a ${knowledgeBase.role}. ${knowledgeBase.about}`;
    }
    
    // Check for contact information
    if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("reach") ||
        queryLower.includes("linkedin") || queryLower.includes("github")) {
      return `You can contact Anurag at:\n\n• Email: ${knowledgeBase.contact.email}\n• LinkedIn: ${knowledgeBase.contact.linkedin}\n• GitHub: ${knowledgeBase.contact.github}`;
    }
    
    // Navigation help
    if (queryLower.includes("navigate") || queryLower.includes("command") || queryLower.includes("help")) {
      return "You can navigate this portfolio by typing commands like:\n• 'Navigate to Projects'\n• 'Navigate to Skills'\n• 'Navigate to Contact'\n• 'Open Resume'\nYou can also ask me about Anurag's projects, skills, or background.";
    }
    
    // Default response for unrecognized queries
    return "I'm not sure about that. You can ask me about Anurag's projects, skills, background, or contact information. You can also navigate the site by typing 'Navigate to Projects'.";
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    addMessage(inputValue);
    
    // Generate and add bot response (with a small delay to simulate thinking)
    setTimeout(() => {
      const response = generateResponse(inputValue);
      addMessage(response, true);
    }, 600);
    
    // Clear input
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
      <button 
        className={`chat-toggle ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat assistant"
      >
        <FaRobot />
      </button>
      
      <div className={`chat-assistant ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <FaRobot />
            <span>Portfolio Assistant</span>
          </div>
          <button className="close-btn" onClick={toggleChat}>
            <FaTimes />
          </button>
        </div>
        
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.isBot ? 'bot' : 'user'}`}
            >
              {message.isBot && <div className="bot-icon"><FaRobot /></div>}
              <div className="message-content">
                {message.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < message.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chat-input" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ask me about Anurag's skills or type 'navigate to projects'..."
            value={inputValue}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <button type="submit" className="send-button">
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatAssistant; 