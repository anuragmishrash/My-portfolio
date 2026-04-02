// Knowledge base about Anurag's portfolio - COMPLETE & UPDATED
export const knowledgeBase = {
  // Personal info - Updated
  name: "Anurag Mishra",
  role: "Full-Stack MERN Developer & AI Enthusiast",
  about: "Final-year B.Tech CSE student at SPSU, Udaipur (graduating May 2026, CGPA 7.6). Specialized in building scalable MERN applications with AI/ML integration. Created FeedScope AI with 92.4% sentiment accuracy and real-time dashboard. Completed internships at Celebal Technologies (Node.js) and iNeuBytes (Web Development). Passionate about creating secure, scalable web applications and exploring AI integration.",
  
  // Projects - COMPLETE & UPDATED
  projects: [
    {
      id: 1,
      name: "FeedScope AI",
      type: "Flagship Project",
      description: "Full-stack AI-powered feedback platform with multilingual sentiment analysis (Hindi + English), real-time admin dashboard, and automated ticket progression. Demonstrates full-stack expertise combining React frontend, Node.js backend, MongoDB database, and Python AI models.",
      shortDescription: "Full-stack AI feedback platform with 92.4% accuracy",
      
      technologies: [
        "React 18",
        "Vite",
        "Tailwind CSS",
        "Framer Motion",
        "Recharts",
        "Node.js",
        "Express.js",
        "Socket.io",
        "MongoDB Atlas",
        "Mongoose",
        "JWT Auth",
        "Python FastAPI",
        "HuggingFace XLM-RoBERTa",
        "Google Gemini 2.5 Flash",
        "Bcryptjs"
      ],
      
      metrics: {
        sentimentAccuracy: "92.4%",
        socketLatency: "58ms",
        cacheHitRate: "73.6%",
        languages: "Hindi + English (Multilingual)"
      },
      
      highlights: [
        "92.4% sentiment analysis accuracy",
        "58ms Socket.io real-time latency",
        "73.6% cache hit rate",
        "Multilingual support (Hindi + English)",
        "Google Gemini 2.5 Flash AI integration",
        "IEEE research paper (15 references)",
        "SPSU presentation-ready"
      ],
      
      features: [
        "Real-time admin dashboard with animated KPI counters",
        "Live feedback counter with [NEW] badge flash",
        "Multilingual sentiment analysis (Hindi + English via XLM-RoBERTa)",
        "Personalized AI responses using Google Gemini 2.5 Flash",
        "Automated ticket progression (New → In Review → Being Resolved → Resolved)",
        "Auto-progression via setTimeout with modal-open API trigger",
        "Public ticket tracking page (/track/:ticketId)",
        "My Feedbacks section for logged-in users",
        "Guest ticket claim system with localStorage bridge",
        "Satisfaction rating after ticket resolution",
        "Stale cache detection with real-time Socket.io notifications",
        "SummaryCache MongoDB collection with TTL index (1hr)",
        "Personalized AI response per feedback (sentiment + emotion + category)",
        "Optional authentication + guest submissions",
        "IEEE two-column LaTeX academic paper (15 references, co-author: Dipesh Vaya)"
      ],
      
      architecture: {
        frontend: "React 18 + Vite + Tailwind CSS + Framer Motion + Recharts",
        backend: "Node.js + Express + Socket.io + JWT + bcryptjs",
        database: "MongoDB Atlas + Mongoose",
        ai: "Python FastAPI + HuggingFace XLM-RoBERTa + Google Gemini 2.5 Flash"
      },
      
      links: {
        github: "https://github.com/anuragmishrash/feedscope-ai",
        demo: "https://feedscope-ai.vercel.app",
        paper: "Available on request"
      },
      
      academicValue: "IEEE research paper with 15 references, SPSU presentation, co-authored with Professor Dipesh Vaya"
    },
    
    {
      id: 2,
      name: "Appointment Scheduler",
      type: "Internship Project (Celebal Technologies)",
      description: "Full-stack MERN application for managing appointments between service providers and clients. Features role-based dashboards, JWT authentication, real-time availability updates, and MongoDB integration. Built during Celebal Technologies internship.",
      shortDescription: "MERN appointment booking system with role-based access",
      
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Authentication",
        "React Query",
        "Bcryptjs",
        "REST APIs"
      ],
      
      highlights: [
        "Celebal Technologies internship project",
        "Production deployment on Vercel",
        "RBAC (Role-Based Access Control)",
        "JWT-secured authentication",
        "Real-time availability management",
        "Calendar integration"
      ],
      
      features: [
        "User authentication with JWT + bcryptjs",
        "Role-based dashboards (Business & Client)",
        "Business service and availability management",
        "Real-time appointment booking, rescheduling, and cancellation",
        "Calendar integration with real-time updates",
        "Client availability tracking",
        "Notification system for bookings",
        "Responsive design for mobile and desktop"
      ],
      
      links: {
        github: "https://github.com/anuragmishrash/appointment-scheduler",
        demo: "https://appointment-scheduler-drab.vercel.app/"
      },
      
      internshipInfo: "Built during May-August 2024 internship at Celebal Technologies"
    },
    
    {
      id: 3,
      name: "TaskFlow",
      type: "Personal Project",
      description: "Real-time collaborative task management platform with Socket.io for live updates. Features JWT-based RBAC, MongoDB storage, React Query for data management, and an analytics dashboard. Showcases expertise in real-time web applications.",
      shortDescription: "Real-time collaboration with Socket.io and RBAC",
      
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "JWT Authentication",
        "React Query",
        "Bcryptjs",
        "Analytics"
      ],
      
      highlights: [
        "Real-time Socket.io collaboration",
        "RBAC (Role-Based Access Control)",
        "Animated analytics dashboard",
        "Production-ready architecture"
      ],
      
      features: [
        "Real-time task updates via Socket.io",
        "User authentication with JWT + bcryptjs",
        "Role-based access control (RBAC)",
        "Create, update, delete, and track tasks",
        "Team collaboration features",
        "Live user presence indicators",
        "Analytics dashboard with task metrics",
        "Real-time notifications",
        "Responsive mobile-first design"
      ],
      
      links: {
        github: "https://github.com/anuragmishrash/taskflow",
        demo: "https://taskflow-app.vercel.app"
      }
    },
    {
      id: 4,
      name: "Smart Bookmark",
      type: "Personal Project",
      description: "A minimal, real-time bookmark manager with instant cross-tab sync, Google OAuth, and a premium glassmorphic UI — built with Next.js 15 and Supabase.",
      shortDescription: "Next.js bookmark manager with real-time sync",
      
      technologies: ['Next.js 15', 'Supabase Auth', 'PostgreSQL', 'Supabase Realtime', 'Tailwind CSS v4', 'Framer Motion', 'TypeScript'],
      
      highlights: [
        "Real-time cross-tab sync via Supabase Realtime",
        "Google OAuth sign-in with Row-Level Security (RLS)",
        "Zero-latency instant search",
        "Premium glassmorphic dual-theme UI"
      ],
      
      features: [
        "Real-time cross-tab sync via Supabase Realtime",
        "Google OAuth sign-in with Row-Level Security (RLS)",
        "Instant search filtering bookmarks by title or URL",
        "Premium glassmorphic dark theme + clean high-contrast light mode",
        "Fully responsive design"
      ],
      
      links: {
        github: "https://github.com/anuragmishrash/smart-bookmark",
        demo: "https://smart-bookmark-kohl.vercel.app/"
      }
    },
    {
      id: 5,
      name: "Talencee — Job Portal",
      type: "Personal Project",
      description: "A full-stack MERN job portal with dynamic content management, advanced job filtering, resume upload, and automated email notifications — deployed and production-ready.",
      shortDescription: "Full-stack MERN job portal with CMS admin panel",
      
      technologies: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'Multer', 'Nodemailer', 'Framer Motion', 'Tailwind CSS'],
      
      highlights: [
        "Dynamic job listings & advanced filters",
        "Resume upload system with PDF/DOC support",
        "Automated SMTP email notifications via Nodemailer",
        "Admin CMS panel for dynamic content management"
      ],
      
      features: [
        "Dynamic job listings with filters (location, job type, work mode)",
        "Resume upload system (PDF/DOC, 5MB limit)",
        "Automated SMTP email notifications to applicant and HR",
        "Admin CMS panel for managing hero content, services, testimonials, and UI copy",
        "Custom animated cursor and smooth transitions"
      ],
      
      links: {
        github: "https://github.com/anuragmishrash/Talencee-Clone",
        demo: "https://talencee-clone.vercel.app/"
      }
    },
    {
      id: 6,
      name: "SPSU Marketplace",
      type: "Academic Project",
      description: "A peer-to-peer campus item exchange platform allowing students to buy, sell, and trade items within the university community.",
      shortDescription: "University campus peer-to-peer marketplace",
      
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MySQL'],
      
      highlights: [
        "Peer-to-peer campus exchange platform",
        "Secure transaction system",
        "In-app messaging functionality"
      ],
      
      features: [
        "User authentication and profile management",
        "Secure transaction system with messaging functionality",
        "Responsive interface for mobile and desktop",
        "RESTful API endpoints for frontend integration"
      ],
      
      links: {
        github: "#",
        demo: "#"
      }
    }
  ],

  // Internships - COMPLETE & UPDATED
  internships: [
    {
      id: 1,
      position: "Node.js Developer Intern",
      company: "Celebal Technologies",
      duration: "May 2024 - August 2024",
      durationMonths: 3,
      type: "Backend Development",
      mode: "Remote (Virtual)",
      certificate: "https://drive.google.com/file/d/1qaKd3y1OmFHsOPWNsaATwrFzDdIcI4kK/view?usp=drivesdk",
      description: "Built RESTful APIs and backend systems using Node.js and Express.js. Developed full-stack MERN application (Appointment Scheduler) with JWT authentication, MongoDB database, and RBAC. Worked on enterprise-level projects using modern JavaScript frameworks and server-side technologies.",
      
      keyProject: "Appointment Scheduler (Full-stack MERN with JWT + RBAC)",
      
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "JWT Authentication",
        "REST API Development",
        "RBAC (Role-Based Access Control)",
        "Mongoose (MongoDB ODM)",
        "Bcryptjs",
        "Git & GitHub",
        "Postman API Testing",
        "Backend Architecture",
        "Full-stack MERN"
      ],
      
      mentors: [
        "Priyanshi Ma'am",
        "Prerna Kamat Ma'am",
        "Sarthak Acharjee Sir"
      ],
      
      highlights: [
        "Developed appointment scheduling system with real-time updates",
        "Implemented JWT authentication and role-based access control",
        "Created RESTful API endpoints for frontend integration",
        "Designed MongoDB schema and Mongoose models",
        "Deployed application on Vercel"
      ]
    },
    
    {
      id: 2,
      position: "Web Development Intern",
      company: "iNeuBytes Technologies",
      duration: "September 2024 - November 2024",
      durationMonths: 3,
      type: "Frontend & AI Integration",
      mode: "Virtual (Remote)",
      certificate: "https://ineubytes.com/public/img/uploads/media/1740849194.pdf",
      description: "Developed frontend components for AI-powered News Analysis and Search Platform. Integrated ML models with React frontend, worked with Flask backend APIs, and participated in fake-news classification project. Gained hands-on experience with AI model integration and responsive UI development.",
      
      keyProjects: [
        "News Article Search & Media Fetcher",
        "AI-powered News Prediction Platform (Fake/Real)"
      ],
      
      skills: [
        "React.js",
        "JavaScript",
        "HTML/CSS",
        "Responsive Design",
        "API Integration",
        "AI/ML Model Integration",
        "Flask Backend",
        "News API",
        "Postman API Testing",
        "Git & GitHub",
        "Error Handling",
        "UX/UI Implementation"
      ],
      
      mentors: [
        "Geetha Pratyusha"
      ],
      
      highlights: [
        "Built responsive UI for real-time news search application",
        "Integrated News API for dynamic content fetching",
        "Implemented fake-news classification ML model on frontend",
        "Created loading animations and error handling",
        "Optimized application performance across devices"
      ]
    }
  ],
  
  // Skills - COMPLETE & UPDATED (ACCURATE TO RESUME)
  skills: {
    languages: [
      { name: "JavaScript", percentage: 90, level: "Expert" },
      { name: "Java", percentage: 75, level: "Intermediate" },
      { name: "C++", percentage: 70, level: "Intermediate" },
      { name: "HTML/CSS", percentage: 90, level: "Expert" }
    ],
    
    technologies: [
      { name: "React.js", percentage: 90, level: "Expert" },
      { name: "Node.js", percentage: 85, level: "Advanced" },
      { name: "Express.js", percentage: 85, level: "Advanced" },
      { name: "MongoDB", percentage: 80, level: "Advanced" },
      { name: "MySQL", percentage: 75, level: "Intermediate" },
      { name: "RESTful APIs", percentage: 90, level: "Expert" },
      { name: "Socket.io", percentage: 85, level: "Advanced" },
      { name: "JWT Authentication", percentage: 85, level: "Advanced" },
      { name: "AI/ML Integration", percentage: 80, level: "Advanced" }
    ],
    
    tools: [
      "MERN Stack",
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "MongoDB Atlas",
      "Vercel",
      "Tailwind CSS",
      "Framer Motion",
      "React Query",
      "Mongoose",
      "Bcryptjs",
      "Gemini API",
      "HuggingFace",
      "Figma",
      "Canva"
    ],
    
    soft: [
      { name: "Problem Solving", percentage: 90 },
      { name: "Communication", percentage: 85 },
      { name: "Team Collaboration", percentage: 90 },
      { name: "Time Management", percentage: 85 },
      { name: "Adaptability", percentage: 85 }
    ]
  },
  
  // Contact information - COMPLETE
  contact: {
    email: "itsanuragmishra99@gmail.com",
    phone: "+91 9461132447",
    linkedin: "https://www.linkedin.com/in/anurag-mishra-218b94252",
    github: "https://github.com/anuragmishrash",
    portfolio: "https://my-portfolio-avsk.vercel.app",
    location: "Udaipur, Rajasthan, India"
  },
  
  // Education
  education: {
    degree: "B.Tech Computer Science Engineering",
    university: "Sir Padampat Singhania University (SPSU)",
    location: "Udaipur, Rajasthan",
    graduationDate: "May 2026",
    cgpa: 7.6,
    cgpaMax: 10
  },
  
  // Achievements & Metrics
  achievements: [
    {
      project: "FeedScope AI",
      metrics: [
        "92.4% sentiment analysis accuracy",
        "58ms Socket.io real-time latency",
        "73.6% cache hit rate",
        "Multilingual support (Hindi + English)",
        "IEEE research paper (15 references)",
        "Google Gemini 2.5 Flash AI integration",
        "SPSU academic presentation ready"
      ]
    },
    {
      project: "Appointment Scheduler",
      metrics: [
        "Live production on Vercel",
        "Celebal Technologies internship project",
        "Full RBAC implementation",
        "JWT-secured authentication",
        "Real-time availability management"
      ]
    },
    {
      category: "Internships",
      metrics: [
        "2 production internships completed",
        "3 months at Celebal Technologies (Node.js)",
        "3 months at iNeuBytes (Web Development)",
        "AICTE-approved internships",
        "Real-world project experience"
      ]
    },
    {
      category: "Academic",
      metrics: [
        "B.Tech CSE Final Year (SPSU, Udaipur)",
        "CGPA: 7.6/10",
        "Graduating: May 2026",
        "IEEE research paper author",
        "Project supervisor: Prof. Dipesh Vaya"
      ]
    }
  ],
  
  // Quick answers for recruiters
  quickAnswers: {
    "hire": "Looking for SDE-1, Full-Stack Developer, Node.js, or React roles. My FeedScope AI demonstrates full-stack expertise with 92.4% accuracy. 2 production internships + real-world project experience. Ready to start immediately or after June 2026.",
    
    "why": "I combine technical depth with real-world impact. Built FeedScope AI with 92.4% sentiment accuracy and Socket.io real-time features. Completed 2 production internships with enterprise-level projects. Fast learner, clean code writer, delivery-focused.",
    
    "full-stack": "Yes, MERN expert: React + Node.js + Express + MongoDB. Also worked with MySQL, Python FastAPI, and AI models. Built complete applications from frontend to backend to database.",
    
    "ai": "Yes, FeedScope AI demonstrates AI expertise: integrated HuggingFace XLM-RoBERTa transformers, Google Gemini API, built sentiment analysis with 92.4% accuracy, multilingual support (Hindi + English).",
    
    "real-time": "Yes, TaskFlow and FeedScope AI both use Socket.io for real-time updates, live dashboards, and instant notifications.",
    
    "deployment": "Experienced with Vercel (frontend), MongoDB Atlas (cloud database), production-ready deployments, Git workflow, and version control.",
    
    "salary": "Floor: ₹4 LPA. Open to negotiation based on role and responsibility.",
    
    "availability": "Graduating May 2026. Available immediately for remote roles or after graduation for on-site positions.",
    
    "projects": "3 major projects: FeedScope AI (flagship with AI), Appointment Scheduler (internship), TaskFlow (real-time). Each demonstrates different technical expertise.",
    
    "best-skill": "Full-stack development with AI integration. FeedScope AI is my best work - it shows React expertise, Node.js/Express APIs, MongoDB design, Python FastAPI, AI models, and Socket.io real-time systems all combined."
  },
  
  // Conversation starters for recruiters
  recruiters: {
    greeting: "Hi! I'm Anurag, a final-year CS student specializing in full-stack MERN development with AI integration. I've built FeedScope AI (92.4% sentiment accuracy), completed internships at Celebal and iNeuBytes, and I'm actively looking for SDE-1 or Full-Stack Developer roles. What brings you to my portfolio?",
    
    pitchShort: "I'm a MERN developer with AI expertise. My flagship project FeedScope AI demonstrates full-stack skills combining React, Node.js, MongoDB, and Python AI models with 92.4% accuracy.",
    
    pitchLong: "I'm Anurag, graduating May 2026 (CGPA 7.6). Built FeedScope AI - a full-stack AI feedback platform with 92.4% sentiment accuracy, real-time Socket.io dashboard, and multilingual support. Completed internships at Celebal Technologies (Node.js) and iNeuBytes (Web Development). Seeking SDE-1 or Full-Stack roles.",
    
    suggestions: [
      "Ask me about FeedScope AI - my flagship project",
      "I can navigate you to my projects section",
      "Want to know about my internship experience?",
      "Check out my GitHub for more projects"
    ]
  }
};