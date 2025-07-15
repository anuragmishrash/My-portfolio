import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Stars, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import './ThreeDEffects.scss';

// Animated Cube Component
const AnimatedCube = ({ position, color, speed = 1 }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01 * speed;
      mesh.current.rotation.y += 0.015 * speed;
      // Add a subtle floating animation
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  );
};

// Floating Text Component
const FloatingSkill = ({ text, position, color }) => {
  const textRef = useRef();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(clock.elapsedTime + position[0]) * 0.1;
      textRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1;
    }
  });
  
  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={0.5}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="#000000"
    >
      {text}
    </Text>
  );
};

// Make camera adaptive to container size
const AdaptiveCamera = () => {
  const { size, camera } = useThree();
  
  useEffect(() => {
    // Adjust camera based on aspect ratio and screen size
    const isMobile = window.innerWidth < 768;
    camera.position.z = isMobile ? 14 : 10;
    camera.fov = isMobile ? 60 : 50;
    camera.updateProjectionMatrix();
  }, [camera]);
  
  return null;
};

// Fallback component when WebGL has issues
const FallbackContent = ({ skills }) => {
  return (
    <div className="three-d-fallback">
      <h3>My Technical Skills</h3>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item" style={{
            animationDelay: `${index * 0.1}s`
          }}>
            {skill}
          </div>
        ))}
      </div>
      <p>For best experience, try a browser with WebGL support.</p>
    </div>
  );
};

// Skill Sphere Component
const SkillsSphere = ({ skills }) => {
  const skillsWithPositions = skills.map((skill, i) => {
    // Distribute skills in a sphere pattern
    const phi = Math.acos(-1 + (2 * i) / skills.length);
    const theta = Math.sqrt(skills.length * Math.PI) * phi;
    const radius = 4.5; // Increased radius for better visibility
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    
    // Generate a color based on position
    const hue = (i / skills.length) * 360;
    const color = `hsl(${hue}, 70%, 60%)`;
    
    return { skill, position: [x, y, z], color };
  });
  
  return (
    <group>
      {skillsWithPositions.map(({ skill, position, color }, i) => (
        <FloatingSkill 
          key={i} 
          text={skill} 
          position={position} 
          color={color} 
        />
      ))}
    </group>
  );
};

// Loading component for suspense
const LoadingFallback = () => (
  <div className="loading-placeholder">
    <p>Loading 3D View...</p>
  </div>
);

// Main 3D Scene Component
const Scene = ({ skills }) => {
  return (
    <>
      <AdaptiveCamera />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <AnimatedCube position={[-2.5, 0, 0]} color="#6e57e0" speed={0.8} />
      <AnimatedCube position={[0, 0, 0]} color="#ff7d3c" speed={1} />
      <AnimatedCube position={[2.5, 0, 0]} color="#00c49a" speed={1.2} />
      <SkillsSphere skills={skills} />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} />
      <OrbitControls 
        enableZoom={true}
        maxDistance={20}
        minDistance={6}
        autoRotate={true} 
        autoRotateSpeed={0.5}
        enablePan={false}
      />
      <Environment preset="sunset" />
    </>
  );
};

// Main Component
const ThreeDEffects = ({ skills = ["React", "JavaScript", "Node.js", "Three.js", "CSS", "HTML", "MongoDB", "Express"] }) => {
  const [hasWebGLSupport, setHasWebGLSupport] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [canvasError, setCanvasError] = useState(false);

  // Check for WebGL support
  useEffect(() => {
    // Check if the browser supports WebGL
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      setHasWebGLSupport(false);
    } else {
      setHasWebGLSupport(true);
    }
    
    // Handle loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCanvasError = (e) => {
    console.error("Canvas error:", e);
    setCanvasError(true);
  };

  return (
    <motion.div 
      className="three-d-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Interactive Skills Showcase</h2>
      <p className="three-d-description">
        Explore my skills in an interactive 3D environment. Click and drag to rotate the view!
      </p>
      
      <div className="canvas-container">
        {isLoading ? (
          <LoadingFallback />
        ) : hasWebGLSupport && !canvasError ? (
          <Suspense fallback={<LoadingFallback />}>
            <Canvas 
              shadows 
              dpr={[1, 2]} 
              camera={{ position: [0, 0, 10], fov: 50 }}
              className="skills-canvas"
              onError={handleCanvasError}
              gl={{ 
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false
              }}
            >
              <Scene skills={skills} />
            </Canvas>
          </Suspense>
        ) : (
          <FallbackContent skills={skills} />
        )}
      </div>
      
      {hasWebGLSupport && !canvasError && (
        <div className="controls-info">
          <p>
            <span>🖱️ Drag</span> to rotate
            <span>🔍 Scroll</span> to zoom
            <span>👆 Double-click</span> to reset view
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ThreeDEffects; 