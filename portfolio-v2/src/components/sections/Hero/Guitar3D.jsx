import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useSound } from '../../../hooks/useSound';
import { GUITAR_STRINGS } from '../../../utils/constants';

// Guitar Model Component
const GuitarModel = ({ onStringClick, isHovered, setIsHovered }) => {
  const groupRef = useRef();
  const [autoRotate, setAutoRotate] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Auto rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      if (autoRotate) {
        // Gentle auto-rotation
        groupRef.current.rotation.y += 0.005;
      }

      // Parallax effect based on mouse position
      if (!autoRotate) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mousePosition.x * 0.5,
          0.1
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mousePosition.y * 0.3,
          0.1
        );
      }

      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const handlePointerMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  };

  useEffect(() => {
    if (isHovered) {
      setAutoRotate(false);
      window.addEventListener('mousemove', handlePointerMove);
    } else {
      setAutoRotate(true);
      window.removeEventListener('mousemove', handlePointerMove);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, [isHovered]);

  return (
    <group
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Guitar Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 2.5, 0.4]} />
        <meshStandardMaterial
          color="#9f7aea"
          metalness={0.7}
          roughness={0.15}
          emissive="#7c3aed"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Guitar Neck */}
      <mesh position={[0, 1.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
        <meshStandardMaterial
          color="#8b7355"
          metalness={0.2}
          roughness={0.6}
          emissive="#5a4530"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Headstock */}
      <mesh position={[0.8, 1.8, 0]} castShadow>
        <boxGeometry args={[0.3, 0.5, 0.1]} />
        <meshStandardMaterial
          color="#6b5544"
          metalness={0.3}
          roughness={0.5}
          emissive="#4a3828"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Sound Hole */}
      <mesh position={[0, 0.3, 0.21]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial
          color="#1a202c"
          metalness={0.2}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Guitar Strings */}
      {GUITAR_STRINGS.map((string, index) => {
        const xOffset = -0.25 + index * 0.1;
        return (
          <GuitarString
            key={string.note}
            position={[xOffset, 0.5, 0.25]}
            index={index}
            onStringClick={onStringClick}
            frequency={string.frequency}
          />
        );
      })}

      {/* Bridge */}
      <mesh position={[0, -0.8, 0.21]}>
        <boxGeometry args={[0.8, 0.1, 0.05]} />
        <meshStandardMaterial
          color="#9f7aea"
          metalness={0.8}
          roughness={0.2}
          emissive="#7c3aed"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Frets on neck */}
      {[...Array(5)].map((_, i) => (
        <mesh
          key={i}
          position={[0.3 - i * 0.15, 1.8, 0.16]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[0.15, 0.15, 0.02, 16]} />
          <meshStandardMaterial color="#d4d4d8" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

// Individual Guitar String Component
const GuitarString = ({ position, index, onStringClick, frequency }) => {
  const meshRef = useRef();
  const [isVibrating, setIsVibrating] = useState(false);

  useFrame(() => {
    if (meshRef.current && isVibrating) {
      // Vibration effect
      meshRef.current.position.z = position[2] + Math.sin(Date.now() * 0.05) * 0.02;
    } else if (meshRef.current) {
      meshRef.current.position.z = position[2];
    }
  });

  const handleClick = () => {
    onStringClick(frequency);
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 500);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'none';
      }}
    >
      <boxGeometry args={[0.01, 2, 0.01]} />
      <meshStandardMaterial
        color={isVibrating ? '#f472b6' : '#e5e7eb'}
        emissive={isVibrating ? '#ec4899' : '#9ca3af'}
        emissiveIntensity={isVibrating ? 0.8 : 0.3}
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
};

// Main Guitar3D Component
const Guitar3D = () => {
  const { playString } = useSound();
  const [isHovered, setIsHovered] = useState(false);

  const handleStringClick = (frequency) => {
    playString(frequency);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#8b5cf6" castShadow />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ec4899" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Guitar Model */}
        <GuitarModel
          onStringClick={handleStringClick}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
        />

        {/* Controls - can be enabled for full 3D rotation */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
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
        }}
      >
        {isHovered ? 'Click the strings to play!' : 'Hover to interact'}
      </div>
    </div>
  );
};

export default Guitar3D;
