import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

// Floating particle with drift animation
const DriftingParticle = ({ 
  x, y, delay, size = 2, opacity = 0.3 
}: { 
  x: string; y: string; delay: number; size?: number; opacity?: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-primary"
    style={{ 
      left: x, 
      top: y, 
      width: size, 
      height: size,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [opacity * 0.5, opacity, opacity * 0.5],
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

// Subtle floating code fragment
const CodeFragment = ({ x, y, delay }: { x: string; y: string; delay: number }) => {
  const fragments = ['0x', '//', '{}', '[]', '=>', '&&', '||', '!=', '++', '--'];
  const fragment = useMemo(() => fragments[Math.floor(Math.random() * fragments.length)], []);
  
  return (
    <motion.div
      className="absolute font-mono text-xs text-primary/10 select-none pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        y: [-30, 30, -30],
        opacity: [0.05, 0.15, 0.05],
      }}
      transition={{
        duration: 20 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    >
      {fragment}
    </motion.div>
  );
};

// Animated connection line
const ConnectionPath = ({ 
  startX, startY, endX, endY, delay 
}: { 
  startX: string; startY: string; endX: string; endY: string; delay: number;
}) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
    <motion.line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke="hsl(var(--primary))"
      strokeWidth="0.5"
      strokeOpacity="0.1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 0] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  </svg>
);

// Radial gradient orb
const GradientOrb = ({ 
  x, y, size, color, delay 
}: { 
  x: string; y: string; size: number; color: 'primary' | 'accent'; delay: number;
}) => {
  const colorVar = color === 'primary' ? 'var(--primary)' : 'var(--accent)';
  
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, hsl(${colorVar} / 0.15) 0%, transparent 70%)`,
        filter: 'blur(40px)',
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 10 + Math.random() * 5,
        repeat: Infinity,
        delay,
        ease: 'easeInOut',
      }}
    />
  );
};

export const CyberBackground = () => {
  // Generate particles with varied positions
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: `${5 + Math.random() * 90}%`,
      y: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 5,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.3,
    })), []
  );

  // Code fragments for atmosphere
  const codeFragments = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: `${10 + Math.random() * 80}%`,
      y: `${10 + Math.random() * 80}%`,
      delay: Math.random() * 8,
    })), []
  );

  // Connection paths
  const connections = useMemo(() => [
    { startX: '10%', startY: '20%', endX: '30%', endY: '40%', delay: 0 },
    { startX: '70%', startY: '15%', endX: '85%', endY: '35%', delay: 2 },
    { startX: '20%', startY: '70%', endX: '40%', endY: '85%', delay: 4 },
    { startX: '60%', startY: '60%', endX: '80%', endY: '75%', delay: 6 },
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(220 15% 8%) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 100%, hsl(var(--primary) / 0.03) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 0% 100%, hsl(var(--accent) / 0.03) 0%, transparent 50%),
            hsl(220 15% 4%)
          `,
        }}
      />

      {/* Animated grid */}
      <div className="absolute inset-0 grid-animated opacity-40" />
      
      {/* Gradient orbs for depth */}
      <GradientOrb x="20%" y="30%" size={400} color="primary" delay={0} />
      <GradientOrb x="80%" y="60%" size={300} color="accent" delay={3} />
      <GradientOrb x="50%" y="80%" size={350} color="primary" delay={6} />

      {/* Connection paths */}
      {connections.map((conn, i) => (
        <ConnectionPath key={i} {...conn} />
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <DriftingParticle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          delay={particle.delay}
          size={particle.size}
          opacity={particle.opacity}
        />
      ))}

      {/* Code fragments */}
      {codeFragments.map((frag) => (
        <CodeFragment key={frag.id} x={frag.x} y={frag.y} delay={frag.delay} />
      ))}

      {/* Vignette overlay */}
      <div className="vignette" />

      {/* Noise texture */}
      <div className="noise-overlay" />
    </div>
  );
};

export const Scanlines = () => (
  <div className="scanlines" aria-hidden="true" />
);

export default CyberBackground;