import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Stars, 
  Text, 
  Float, 
  MeshDistortMaterial, 
  Sparkles
} from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './ThreeDEffects.scss';

// Animated Cube Component with distortion
const AnimatedCube = ({ position, color, speed = 1 }) => {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01 * speed;
      mesh.current.rotation.y += 0.015 * speed;
      // Add a subtle floating animation
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Add pulse effect when hovered
      if (hovered) {
        mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, 1.2, 0.1);
        mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, 1.2, 0.1);
        mesh.current.scale.z = THREE.MathUtils.lerp(mesh.current.scale.z, 1.2, 0.1);
      } else {
        mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, 1, 0.1);
        mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, 1, 0.1);
        mesh.current.scale.z = THREE.MathUtils.lerp(mesh.current.scale.z, 1, 0.1);
      }
    }
  });

  return (
    <mesh 
      ref={mesh} 
      position={position} 
      castShadow 
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <MeshDistortMaterial 
        color={color} 
        metalness={0.5} 
        roughness={0.2} 
        speed={hovered ? 5 : 2}
        distort={hovered ? 0.3 : 0.1}
      />
    </mesh>
  );
};

// Floating Text Component with enhanced animation
const FloatingSkill = ({ text, position, color, category }) => {
  // Adjust text size based on length
  const fontSize = text.length > 12 ? 0.4 : (text.length > 8 ? 0.45 : 0.5);
  
  // Adjust color based on skill category
  let skillColor = color;
  if (category === 'language') {
    skillColor = '#6e57e0'; // Purple for languages
  } else if (category === 'tech') {
    skillColor = '#00c49a'; // Teal for technologies
  } else if (category === 'tool') {
    skillColor = '#ff7d3c'; // Orange for tools
  }
  
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={0.5} // Up/down float intensity
      position={position}
    >
      <Text
        fontSize={fontSize}
        color={skillColor}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        maxWidth={2}
      >
        {text}
      </Text>
      <Sparkles 
        count={10} 
        scale={1.5} 
        size={0.4} 
        speed={0.3} 
        color={skillColor} 
        opacity={0.5} 
      />
    </Float>
  );
};

// Make camera adaptive to container size
const AdaptiveCamera = () => {
  const { camera } = useThree();
  
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
  // Categorize skills for better display
  const languages = skills.slice(0, 6);
  const technologies = skills.slice(6, 14);
  const tools = skills.slice(14);
  
  return (
    <div className="three-d-fallback">
      <h3>My Technical Skills</h3>
      
      <div className="skills-categories">
        <div className="skills-category">
          <h4>Languages</h4>
          <div className="skills-grid">
            {languages.map((skill, index) => (
              <div key={`lang-${index}`} className="skill-item language-skill" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
        
        <div className="skills-category">
          <h4>Technologies</h4>
          <div className="skills-grid">
            {technologies.map((skill, index) => (
              <div key={`tech-${index}`} className="skill-item tech-skill" style={{
                animationDelay: `${(index + languages.length) * 0.1}s`
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
        
        <div className="skills-category">
          <h4>Tools & Ecosystems</h4>
          <div className="skills-grid">
            {tools.map((skill, index) => (
              <div key={`tool-${index}`} className="skill-item tool-skill" style={{
                animationDelay: `${(index + languages.length + technologies.length) * 0.1}s`
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <p>For best experience, try a browser with WebGL support.</p>
    </div>
  );
};

// Dynamic Background
const DynamicBackground = () => {
  const { scene } = useThree();
  const colors = useMemo(() => [
    new THREE.Color('#6e57e0').convertSRGBToLinear(),
    new THREE.Color('#17a2b8').convertSRGBToLinear(),
    new THREE.Color('#007bff').convertSRGBToLinear()
  ], []);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2;
    const idx = Math.floor(t % colors.length);
    const nextIdx = (idx + 1) % colors.length;
    const blend = t % 1;
    
    colors[idx].clone().lerp(colors[nextIdx], blend);
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.05);
  });
  
  return null;
};

// Skill Sphere Component
const SkillsSphere = ({ skills }) => {
  // Categorize skills
  const languages = skills.slice(0, 6);
  const technologies = skills.slice(6, 14);
  const tools = skills.slice(14);
  
  // Combine all skills with their categories
  const categorizedSkills = [
    ...languages.map(skill => ({ skill, category: 'language' })),
    ...technologies.map(skill => ({ skill, category: 'tech' })),
    ...tools.map(skill => ({ skill, category: 'tool' }))
  ];
  
  const skillsWithPositions = useMemo(() => categorizedSkills.map(({ skill, category }, i) => {
    // Distribute skills in a sphere pattern
    const phi = Math.acos(-1 + (2 * i) / categorizedSkills.length);
    const theta = Math.sqrt(categorizedSkills.length * Math.PI) * phi;
    const radius = 5; // Increased radius for better visibility with more skills
    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);
    
    // Generate a color based on position
    const hue = (i / categorizedSkills.length) * 360;
    const color = `hsl(${hue}, 70%, 60%)`;
    
    return { skill, position: [x, y, z], color, category };
  }), [categorizedSkills]);
  
  return (
    <group>
      {skillsWithPositions.map(({ skill, position, color, category }, i) => (
        <FloatingSkill 
          key={i} 
          text={skill} 
          position={position} 
          color={color}
          category={category}
        />
      ))}
    </group>
  );
};

// Loading component for suspense
const LoadingFallback = () => (
  <div className="loading-placeholder">
    <p>Loading 3D Skills View...</p>
    <div className="loading-spinner"></div>
  </div>
);

// Main 3D Scene Component
const Scene = ({ skills }) => {
  return (
    <>
      <AdaptiveCamera />
      <DynamicBackground />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} castShadow />
      <spotLight position={[-10, -10, -10]} intensity={0.5} castShadow />
      
      <AnimatedCube position={[-3, 0, 0]} color="#6e57e0" speed={0.8} />
      <AnimatedCube position={[3, 0, 0]} color="#00c49a" speed={1.2} />
      
      <SkillsSphere skills={skills} />
      
      <Sparkles 
        count={100} 
        scale={10} 
        size={1} 
        speed={0.3} 
        opacity={0.5} 
      />
      
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={4} 
        saturation={0.5}
        fade
        speed={1}
      />
      
      <OrbitControls 
        enableZoom={true}
        maxDistance={20}
        minDistance={6}
        autoRotate={true} 
        autoRotateSpeed={0.5}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
      />
      
      <Environment preset="sunset" />
    </>
  );
};

// Main Component
const ThreeDEffects = ({ skills = [] }) => {
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
      <h2 className="gradient-text">Interactive Skills Showcase</h2>
      <p className="three-d-description">
        Explore my technical skills in an interactive 3D environment. Click and drag to rotate the view!
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
              performance={{ min: 0.5 }}
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
            <span>👆 Click</span> on objects to interact
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ThreeDEffects; 