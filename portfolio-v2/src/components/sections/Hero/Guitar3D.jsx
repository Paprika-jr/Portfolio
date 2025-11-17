import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

// Morphing Shape Component - Guitar to Code Symbols
const MorphingShape = ({ isHovered, setIsHovered }) => {
  const groupRef = useRef();
  const shapeRef = useRef();
  const [morphProgress, setMorphProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animation and morphing logic
  useFrame((state) => {
    if (groupRef.current) {
      // Continuous morphing animation
      const time = state.clock.elapsedTime;
      const newProgress = (Math.sin(time * 0.3) + 1) / 2; // 0 to 1 cycle
      setMorphProgress(newProgress);

      // Parallax rotation based on mouse
      if (isHovered) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mousePosition.x * 0.3,
          0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mousePosition.y * 0.2,
          0.05
        );
      } else {
        // Gentle auto-rotation when not hovered
        groupRef.current.rotation.y += 0.003;
      }

      // Floating animation
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    }
  });

  const handlePointerMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  };

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
    >
      {/* Main morphing body */}
      <GuitarToCodeMorph morphProgress={morphProgress} shapeRef={shapeRef} />

      {/* Code strings/lines */}
      <CodeStrings morphProgress={morphProgress} />

      {/* Floating particles */}
      <FloatingParticles morphProgress={morphProgress} />

      {/* Glowing outline */}
      <GlowEffect morphProgress={morphProgress} />
    </group>
  );
};

// Guitar body that morphs into curly braces { }
const GuitarToCodeMorph = ({ morphProgress, shapeRef }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      // Morph the scale to create bracket shape
      const guitarScale = 1;
      const bracketScale = 0.3;
      const currentScale = THREE.MathUtils.lerp(guitarScale, bracketScale, morphProgress);

      // Width changes to create bracket shape
      meshRef.current.scale.x = 1.8 - morphProgress * 0.8;
      meshRef.current.scale.y = 2.5 - morphProgress * 1.5;

      // Color shift
      const guitarColor = new THREE.Color('#9f7aea');
      const codeColor = new THREE.Color('#a78bfa');
      const currentColor = guitarColor.clone().lerp(codeColor, morphProgress);
      meshRef.current.material.color = currentColor;
      meshRef.current.material.emissive = currentColor;
      meshRef.current.material.emissiveIntensity = 0.3 + morphProgress * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[1, 1, 0.4]} />
      <meshStandardMaterial
        color="#9f7aea"
        metalness={0.7}
        roughness={0.15}
        emissive="#7c3aed"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

// Strings that become code lines
const CodeStrings = ({ morphProgress }) => {
  const codeSnippets = [
    'const dev = "KHLA"',
    'React.js',
    'Firebase',
    '{ JavaScript }',
    '< HTML />',
    'Git',
  ];

  return (
    <group>
      {codeSnippets.map((code, index) => {
        const yPos = 1.5 - index * 0.5;
        const xOffset = -0.3 + index * 0.1;

        return (
          <CodeLine
            key={index}
            position={[xOffset, yPos, 0.25]}
            text={code}
            morphProgress={morphProgress}
            index={index}
          />
        );
      })}
    </group>
  );
};

// Individual code line component
const CodeLine = ({ position, text, morphProgress, index }) => {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // String to code transformation
      const stringOpacity = 1 - morphProgress;
      const codeOpacity = morphProgress;

      meshRef.current.material.opacity = stringOpacity;

      // Pulsing glow effect
      const pulse = Math.sin(state.clock.elapsedTime * 2 + index) * 0.3 + 0.7;
      if (textRef.current) {
        textRef.current.fillOpacity = codeOpacity * pulse;
      }
    }
  });

  return (
    <>
      {/* String line */}
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.01, 2.5, 0.01]} />
        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#a78bfa"
          emissiveIntensity={0.5}
          transparent
          opacity={1}
        />
      </mesh>

      {/* Code text */}
      <Text
        ref={textRef}
        position={[position[0] + 0.5, position[1], position[2] + 0.1]}
        fontSize={0.12}
        color="#a78bfa"
        anchorX="left"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#7c3aed"
      >
        {text}
      </Text>
    </>
  );
};

// Floating particles around the shape
const FloatingParticles = ({ morphProgress }) => {
  const particlesRef = useRef();
  const particleCount = 30;
  const positions = useRef([]);

  // Initialize particle positions
  if (positions.current.length === 0) {
    for (let i = 0; i < particleCount; i++) {
      positions.current.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        const pos = positions.current[i];

        // Circular floating motion
        particle.position.x = pos.x + Math.sin(state.clock.elapsedTime * pos.speed + i) * 0.3;
        particle.position.y = pos.y + Math.cos(state.clock.elapsedTime * pos.speed + i) * 0.3;

        // Opacity based on morph progress
        particle.material.opacity = 0.3 + morphProgress * 0.4;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: particleCount }).map((_, i) => (
        <mesh key={i} position={[positions.current[i]?.x || 0, positions.current[i]?.y || 0, positions.current[i]?.z || 0]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// Glowing outline effect
const GlowEffect = ({ morphProgress }) => {
  const glowRef = useRef();

  useFrame((state) => {
    if (glowRef.current) {
      // Pulsing glow
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.3 + 0.7;
      glowRef.current.material.emissiveIntensity = (0.5 + morphProgress * 0.5) * pulse;

      // Rotate opposite direction for visual interest
      glowRef.current.rotation.z = -state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={glowRef} position={[0, 0, -0.3]}>
      <torusGeometry args={[2, 0.05, 16, 100]} />
      <meshStandardMaterial
        color="#a78bfa"
        emissive="#7c3aed"
        emissiveIntensity={0.6}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
};

// Main Guitar3D Component
const Guitar3D = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#a78bfa" castShadow />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color="#ec4899" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="#8b5cf6"
          castShadow
        />

        {/* Morphing Shape */}
        <MorphingShape isHovered={isHovered} setIsHovered={setIsHovered} />
      </Canvas>

      {/* Instruction text */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-secondary)',
          fontSize: '14px',
          fontWeight: 600,
          textAlign: 'center',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
          padding: '0 20px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '20px',
          padding: '8px 16px',
        }}
      >
        {isHovered ? 'Guitar → Code → Guitar ∞' : 'Hover to control'}
      </div>
    </div>
  );
};

export default Guitar3D;
