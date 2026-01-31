import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Matrix rain character component
const MatrixColumn = ({ delay, left }: { delay: number; left: string }) => {
  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];
  
  return (
    <motion.div
      className="absolute top-0 font-mono text-xs text-primary/20 whitespace-pre leading-4 pointer-events-none select-none"
      style={{ left }}
      initial={{ y: '-100%' }}
      animate={{ y: '100vh' }}
      transition={{
        duration: Math.random() * 10 + 15,
        repeat: Infinity,
        delay,
        ease: 'linear'
      }}
    >
      {Array.from({ length: 30 }, () => randomChar()).join('\n')}
    </motion.div>
  );
};

// Floating network node
const NetworkNode = ({ x, y, delay }: { x: string; y: string; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-primary/30 rounded-full"
    style={{ left: x, top: y }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
    }}
  />
);

// Connection line between nodes
const ConnectionLine = ({ 
  x1, y1, x2, y2, delay 
}: { 
  x1: string; y1: string; x2: string; y2: string; delay: number 
}) => (
  <motion.svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ overflow: 'visible' }}
  >
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="hsl(142 70% 45% / 0.1)"
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        delay,
      }}
    />
  </motion.svg>
);

export const CyberBackground = () => {
  const matrixColumns = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5,
    left: `${(i / 15) * 100}%`,
  }));

  const nodes = [
    { x: '10%', y: '20%' },
    { x: '25%', y: '60%' },
    { x: '40%', y: '30%' },
    { x: '55%', y: '70%' },
    { x: '70%', y: '25%' },
    { x: '85%', y: '55%' },
    { x: '15%', y: '80%' },
    { x: '90%', y: '15%' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Grid background */}
      <div className="absolute inset-0 grid-cyber opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Matrix rain - very subtle */}
      <div className="absolute inset-0 opacity-30">
        {matrixColumns.map((col) => (
          <MatrixColumn key={col.id} delay={col.delay} left={col.left} />
        ))}
      </div>

      {/* Network nodes */}
      {nodes.map((node, i) => (
        <NetworkNode key={i} x={node.x} y={node.y} delay={i * 0.5} />
      ))}

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(120 5% 3%) 100%)',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-primary/20" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-primary/20" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-primary/20" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-primary/20" />
    </div>
  );
};

export const Scanlines = () => (
  <div className="scanlines" aria-hidden="true" />
);

export default CyberBackground;
