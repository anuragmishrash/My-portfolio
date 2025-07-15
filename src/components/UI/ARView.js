import React, { useEffect, useRef, useState } from 'react';
import './ARView.scss';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaCamera, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ARView = ({ projects }) => {
  const [isARSupported, setIsARSupported] = useState(null);
  const [isARActive, setIsARActive] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Detect device capabilities on mount
  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());
    
    // Check if the browser supports camera access and necessary features
    const checkARSupport = async () => {
      try {
        // On laptops/desktops, always set AR as supported since we'll show a fallback
        if (!checkMobile()) {
          setIsARSupported(true);
          return;
        }
        
        // Check for getUserMedia support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setIsARSupported(false);
          return;
        }
        
        // Verify camera access without actually starting the stream
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        
        // If we got here, camera access is available
        stream.getTracks().forEach(track => track.stop());
        setIsARSupported(true);
      } catch (err) {
        console.error("AR support check failed:", err);
        if (err.name === 'NotAllowedError') {
          setCameraPermissionDenied(true);
        }
        setIsARSupported(false);
      }
    };
    
    checkARSupport();
    
    // Clean up on unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startAR = async () => {
    if (!isARSupported) return;

    try {
      setError(null);
      setIsARActive(true);
      
      // For desktop, we don't need to access the camera
      if (!isMobile) {
        // Set up canvas for desktop AR rendering
        if (canvasRef.current) {
          setupDesktopARView();
        }
        return;
      }
      
      // Get camera stream with appropriate constraints for the device
      const constraints = {
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      
      // Add a small delay before requesting camera access to ensure UI is ready
      setTimeout(async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            
            // Handle video loading
            videoRef.current.onloadedmetadata = () => {
              videoRef.current.play().catch(e => {
                console.error("Video play error:", e);
                setError("Couldn't start video stream. Please check camera permissions.");
              });
            };
            
            // Set up canvas for AR rendering
            if (canvasRef.current) {
              setupCanvas();
            }
          }
        } catch (error) {
          handleCameraError(error);
        }
      }, 300);
    } catch (error) {
      handleCameraError(error);
    }
  };

  const handleCameraError = (error) => {
    console.error('Error starting AR:', error);
    
    // Provide more specific error messages
    if (error.name === 'NotAllowedError') {
      setError("Camera access denied. Please allow camera permissions in your browser settings.");
      setCameraPermissionDenied(true);
    } else if (error.name === 'NotFoundError') {
      setError("No camera found on your device.");
    } else if (error.name === 'NotReadableError') {
      setError("Camera is already in use by another application.");
    } else {
      setError("Couldn't access camera. Please check permissions and try again.");
    }
    
    setIsARActive(false);
  };

  // Setup desktop-specific AR view with simulated content
  const setupDesktopARView = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Function to draw desktop AR content
    const drawDesktopAR = () => {
      if (!isARActive || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid for AR effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      // Horizontal lines
      const gridSpacing = 40;
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw title
      ctx.fillStyle = 'white';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Desktop AR View', canvas.width/2, 80);
      
      // Draw subtitle
      ctx.font = '16px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('For the best AR experience, please use a mobile device.', canvas.width/2, 120);
      
      // Draw project cards
      if (projects && projects.length) {
        const centerY = canvas.height / 2;
        const cardWidth = Math.min(canvas.width * 0.25, 300);
        const cardHeight = cardWidth * 0.8;
        const totalWidth = projects.length * cardWidth + (projects.length - 1) * 30;
        let startX = (canvas.width - totalWidth) / 2;
        
        if (startX < 20) startX = 20;
        
        projects.forEach((project, index) => {
          const xPos = startX + index * (cardWidth + 30);
          const yPos = centerY;
          
          // Card shadow
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(xPos + 5, yPos - cardHeight/2 + 5, cardWidth, cardHeight);
          
          // Card background
          const cardGradient = ctx.createLinearGradient(xPos, yPos - cardHeight/2, xPos, yPos + cardHeight/2);
          cardGradient.addColorStop(0, '#2a2a4a');
          cardGradient.addColorStop(1, '#1a1a2e');
          ctx.fillStyle = cardGradient;
          ctx.fillRect(xPos, yPos - cardHeight/2, cardWidth, cardHeight);
          
          // Card border
          ctx.strokeStyle = '#6C63FF';
          ctx.lineWidth = 2;
          ctx.strokeRect(xPos, yPos - cardHeight/2, cardWidth, cardHeight);
          
          // Project title
          ctx.fillStyle = 'white';
          ctx.font = 'bold 16px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(project.title || 'Project', xPos + cardWidth/2, yPos - cardHeight/3);
          
          // Project tech
          ctx.font = '14px Arial';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          const techText = project.technologies ? project.technologies.slice(0, 3).join(", ") : 'Tech Stack';
          ctx.fillText(techText, xPos + cardWidth/2, yPos);
          
          // Preview text
          ctx.fillStyle = '#6C63FF';
          ctx.font = '12px Arial';
          ctx.fillText('View Project Details', xPos + cardWidth/2, yPos + cardHeight/3);
        });
      }
      
      // Continue animation loop
      if (isARActive) {
        requestAnimationFrame(drawDesktopAR);
      }
    };
    
    // Start drawing desktop AR content
    drawDesktopAR();
  };

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Draw AR content function
    const drawARContent = () => {
      if (!isARActive || !canvas) return;
      
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // First make sure video is ready
      if (videoRef.current && videoRef.current.readyState >= 2) {
        // Calculate proportional scaling
        const videoRatio = videoRef.current.videoWidth / videoRef.current.videoHeight;
        const canvasRatio = canvas.width / canvas.height;
        
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
        
        if (videoRatio > canvasRatio) {
          // Video is wider than canvas
          drawHeight = canvas.height;
          drawWidth = videoRef.current.videoWidth * (canvas.height / videoRef.current.videoHeight);
          offsetX = (canvas.width - drawWidth) / 2;
        } else {
          // Video is taller than canvas
          drawWidth = canvas.width;
          drawHeight = videoRef.current.videoHeight * (canvas.width / videoRef.current.videoWidth);
          offsetY = (canvas.height - drawHeight) / 2;
        }
        
        // Draw the video
        ctx.drawImage(videoRef.current, offsetX, offsetY, drawWidth, drawHeight);
        
        // Draw project cards in AR with improved visibility
        if (projects && projects.length) {
          projects.forEach((project, index) => {
            // Position the project cards in different areas
            const spacing = canvas.height / (projects.length + 1);
            const xPos = index % 2 === 0 ? canvas.width * 0.25 : canvas.width * 0.65;
            const yPos = spacing * (index + 1);
            
            // Draw card with better contrast
            const cardWidth = Math.min(canvas.width * 0.4, 300);
            const cardHeight = cardWidth * 0.6;
            
            // Semi-transparent background with border
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(xPos - cardWidth/2, yPos - cardHeight/2, cardWidth, cardHeight);
            ctx.strokeStyle = '#6C63FF';
            ctx.lineWidth = 3;
            ctx.strokeRect(xPos - cardWidth/2, yPos - cardHeight/2, cardWidth, cardHeight);
            
            // Project title
            ctx.fillStyle = 'white';
            ctx.font = 'bold 18px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(project.title || 'Project', xPos, yPos - cardHeight/4);
            
            // Project tech
            ctx.font = '14px Arial';
            const techText = project.technologies ? project.technologies.slice(0, 3).join(", ") : 'Tech Stack';
            ctx.fillText(techText, xPos, yPos + 10);
            
            // View indicator
            ctx.font = '12px Arial';
            ctx.fillText('Tap to view details', xPos, yPos + cardHeight/3);
          });
        }
      } else {
        // If video isn't ready, show a message
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Starting camera...', canvas.width/2, canvas.height/2);
        ctx.font = '16px Arial';
        ctx.fillText('Please allow camera access when prompted', canvas.width/2, canvas.height/2 + 30);
      }
      
      // Continue animation loop
      if (isARActive) {
        requestAnimationFrame(drawARContent);
      }
    };
    
    // Start drawing AR content
    drawARContent();
  };

  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
    setError(null);
  };

  // Handle window resize to update canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && isARActive) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Redraw the canvas if it's desktop AR
        if (!isMobile) {
          setupDesktopARView();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // Cleanup video tracks when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isARActive, isMobile]);

  // Handle escape key to exit AR mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isARActive) {
        stopAR();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isARActive]);

  // Render fallback content for unsupported devices
  const renderFallback = () => {
    return (
      <div className="ar-fallback">
        <FaExclamationTriangle className="icon" />
        <h3>AR View Not Available</h3>
        <p>
          {isMobile 
            ? cameraPermissionDenied 
              ? "Camera access was denied. Please allow camera permissions in your browser settings and refresh the page."
              : "Your device doesn't support the camera features needed for AR. This might be due to browser restrictions or hardware limitations."
            : "Full AR View works best on mobile devices with camera access. You can still try the desktop version with limited features."}
        </p>
        
        {isMobile && (
          <div className="ar-troubleshooting">
            <h4>Troubleshooting Steps:</h4>
            <ol>
              <li>Make sure your browser is up to date</li>
              <li>Verify camera permissions are allowed for this site</li>
              <li>Try using Chrome or Safari browsers</li>
              <li>Make sure your device supports WebRTC</li>
              <li>If possible, access the site using HTTPS</li>
              <li>Try refreshing the page after granting permissions</li>
            </ol>
          </div>
        )}
        
        <div className="fallback-projects">
          <h4>My Projects</h4>
          <div className="projects-grid">
            {projects && projects.map((project, index) => (
              <div key={index} className="project-card">
                <h5>{project.title || 'Project'}</h5>
                <p>{project.technologies ? project.technologies.slice(0, 3).join(", ") : 'Tech Stack'}</p>
              </div>
            ))}
          </div>
        </div>
        {!isMobile && (
          <motion.button 
            className="ar-button"
            onClick={startAR}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCamera className="button-icon" /> Try Desktop AR View
          </motion.button>
        )}
      </div>
    );
  };

  // Function to handle manual exit button click
  const handleExitAR = () => {
    stopAR();
  };

  return (
    <motion.div 
      className="ar-view-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>AR Project Viewer</h2>
      <p className="ar-description">
        Experience my projects in augmented reality! Point your camera at your surroundings to see interactive project cards.
      </p>
      
      {/* Show loading state while checking AR support */}
      {isARSupported === null && (
        <div className="ar-loading">
          <p>Checking device compatibility</p>
        </div>
      )}
      
      {/* Show error message if there is one */}
      {error && (
        <div className="ar-error">
          <p>{error}</p>
          <button className="ar-button retry" onClick={() => {
            stopAR();
            setTimeout(startAR, 500);
          }}>
            Retry
          </button>
        </div>
      )}
      
      {/* Show start/stop button based on AR state */}
      {isARSupported !== null && !isARActive && (
        isARSupported ? (
          <motion.button 
            className="ar-button"
            onClick={startAR}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCamera className="button-icon" /> Start AR View
          </motion.button>
        ) : (
          renderFallback()
        )
      )}
      
      {isARActive && (
        <>
          <motion.button 
            className="ar-button stop"
            onClick={handleExitAR}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Exit AR Mode
          </motion.button>
          
          <div className={`ar-view ${error ? 'has-error' : ''}`}>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              muted
              style={{ display: isMobile ? 'none' : 'block' }}
            />
            <canvas 
              ref={canvasRef} 
              className="ar-canvas"
            />
            <div className="ar-controls">
              <p>{isMobile ? 'AR Mode Active - Move your device to explore' : 'Desktop AR Mode - Project Preview'}</p>
            </div>
            
            {/* Prominent close button in AR view */}
            <button 
              className="ar-close-btn" 
              onClick={handleExitAR} 
              aria-label="Close AR View"
            >
              <FaTimes />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ARView; 