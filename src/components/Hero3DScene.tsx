import { useRef, useMemo, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Check for reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
};

// Mouse position tracker for the 3D scene
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mousePosition;
};

// Abstract geometric shape that reacts to mouse
const AbstractShape = ({ mousePosition, reducedMotion }: { mousePosition: { x: number; y: number }; reducedMotion: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Slow base rotation
    if (!reducedMotion) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
    }
    
    // Smooth mouse following
    targetRotation.current.x = mousePosition.y * 0.3;
    targetRotation.current.y = mousePosition.x * 0.3;
    
    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.5}
      rotationIntensity={reducedMotion ? 0 : 0.2}
      floatIntensity={reducedMotion ? 0 : 0.5}
    >
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#888888"
          roughness={0.3}
          metalness={0.8}
          distort={reducedMotion ? 0 : 0.3}
          speed={reducedMotion ? 0 : 2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
};

// Orbiting wireframe rings
const OrbitRings = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (reducedMotion) return;
    
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.2;
      ring1Ref.current.rotation.z += delta * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.15;
      ring2Ref.current.rotation.z -= delta * 0.08;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.1;
      ring3Ref.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#666666" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[2.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#555555" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <torusGeometry args={[3.1, 0.01, 16, 100]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.2} />
      </mesh>
    </>
  );
};

// Floating particles
const Particles = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3.5 + Math.random() * 1.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);
  
  useFrame((state, delta) => {
    if (particlesRef.current && !reducedMotion) {
      particlesRef.current.rotation.y += delta * 0.02;
      particlesRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#888888"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Scene component
const Scene = () => {
  const reducedMotion = useReducedMotion();
  const mousePosition = useMousePosition();
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#888888" />
      <pointLight position={[0, 0, 4]} intensity={0.5} color="#ffffff" />
      
      <AbstractShape mousePosition={mousePosition} reducedMotion={reducedMotion} />
      <OrbitRings reducedMotion={reducedMotion} />
      <Particles reducedMotion={reducedMotion} />
    </>
  );
};

// Fallback for when WebGL is not available
const Fallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-48 h-48 border border-foreground/10 rounded-full animate-pulse" />
  </div>
);

// Loading component
const Loading = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-32 h-32 border border-foreground/20 rounded-full animate-spin" 
         style={{ borderTopColor: 'transparent' }} />
  </div>
);

// Check WebGL support
const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};

// Main component
const Hero3DScene = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
    // Delay loading indicator
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  if (!webGLSupported) {
    return <Fallback />;
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {!isLoaded && <Loading />}
      <Suspense fallback={<Loading />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: 'high-performance'
          }}
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transition: 'opacity 0.5s ease-in-out' 
          }}
          onCreated={() => setIsLoaded(true)}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Hero3DScene;
