import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';

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

// Placeholder geometric model (used when no GLTF is provided)
const PlaceholderModel = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central dodecahedron */}
      <mesh position={[0, 0, 0]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#888888" 
          metalness={0.7} 
          roughness={0.3}
          wireframe={false}
        />
      </mesh>
      
      {/* Wireframe outer shell */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.3, 1]} />
        <meshBasicMaterial 
          color="#555555" 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Orbiting small spheres */}
      {[0, 1, 2].map((i) => (
        <mesh 
          key={i}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 1.8,
            Math.sin((i / 3) * Math.PI * 2 + Date.now() * 0.001) * 0.3,
            Math.sin((i / 3) * Math.PI * 2) * 1.8,
          ]}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// GLTF Model loader component
const GLTFModel = ({ url, reducedMotion }: { url: string; reducedMotion: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  
  useFrame((state, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  // Apply monochrome materials
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: '#888888',
          metalness: 0.6,
          roughness: 0.4,
        });
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
};

// Loading indicator
const LoadingIndicator = () => (
  <Html center>
    <div className="text-muted-foreground text-sm font-mono">Loading 3D...</div>
  </Html>
);

// Scene component
const Scene = ({ modelUrl, reducedMotion }: { modelUrl?: string; reducedMotion: boolean }) => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-3, -3, -3]} intensity={0.3} color="#888888" />
      <spotLight 
        position={[0, 5, 0]} 
        angle={0.3} 
        penumbra={0.8} 
        intensity={0.5} 
        color="#ffffff"
      />
      
      <Suspense fallback={<LoadingIndicator />}>
        {modelUrl ? (
          <GLTFModel url={modelUrl} reducedMotion={reducedMotion} />
        ) : (
          <PlaceholderModel reducedMotion={reducedMotion} />
        )}
      </Suspense>
      
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.4} 
        scale={5} 
        blur={2} 
        far={3}
        color="#000000"
      />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        rotateSpeed={0.5}
      />
    </>
  );
};

// Static fallback image
const StaticFallback = () => (
  <div className="w-full h-[400px] flex items-center justify-center bg-foreground/5 rounded-2xl border border-foreground/10">
    <div className="text-center">
      <div className="w-32 h-32 mx-auto mb-4 border-2 border-foreground/20 rounded-full flex items-center justify-center">
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          className="text-foreground/40"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
      <p className="text-muted-foreground text-sm">3D viewer not available</p>
    </div>
  </div>
);

// Main Model Viewer component
interface ModelViewerProps {
  modelUrl?: string;
  title?: string;
  description?: string;
}

const ModelViewer = ({ 
  modelUrl, 
  title = "Interactive 3D Model",
  description = "Click and drag to rotate • Monochrome rendering"
}: ModelViewerProps) => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const reducedMotion = useReducedMotion();
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const scrollY = useScrollY();

  useEffect(() => {
    setWebGLSupported(isWebGLSupported());
  }, []);

  return (
    <section 
      id="3d-showcase"
      className="py-24 md:py-32 px-6 section-dark overflow-hidden relative"
    >
      {/* Decorative background elements */}
      <div 
        className="absolute top-20 right-10 w-64 h-64 border border-foreground/5 rounded-full pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      />
      <div 
        className="absolute bottom-20 left-10 w-48 h-48 border border-foreground/5 rounded-full pointer-events-none"
        style={{ transform: `translateY(${scrollY * -0.03}px)` }}
      />
      
      <div ref={ref} className={`container mx-auto max-w-4xl relative z-10 ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header text-center mb-12">
          <p className="section-label">Interactive Showcase</p>
          <h2 className="section-title shimmer-text">{title}</h2>
          <p className="text-muted-foreground mt-4">{description}</p>
        </div>
        
        <div 
          className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          {webGLSupported ? (
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-foreground/5 to-transparent border border-foreground/10">
              <Canvas
                camera={{ position: [0, 1, 4], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ 
                  antialias: true, 
                  alpha: true,
                  powerPreference: 'high-performance'
                }}
              >
                <Scene modelUrl={modelUrl} reducedMotion={reducedMotion} />
              </Canvas>
              
              {/* Instructions overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground text-xs font-mono bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-foreground/10">
                Drag to rotate
              </div>
            </div>
          ) : (
            <StaticFallback />
          )}
        </div>
      </div>
    </section>
  );
};

export default ModelViewer;
