import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newDot: TrailDot = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };

    setTrail((prev) => [...prev.slice(-12), newDot]);
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setTrail([]);
  }, []);

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseLeave]);

  // Clean up old trail dots
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(-8));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[90]">
      {trail.map((dot, index) => {
        const opacity = (index + 1) / trail.length;
        const scale = 0.3 + (index / trail.length) * 0.7;
        
        return (
          <motion.div
            key={dot.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: opacity * 0.6, scale }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/30 blur-sm"
            style={{
              left: dot.x,
              top: dot.y,
            }}
          />
        );
      })}
      
      {/* Main cursor dot */}
      {trail.length > 0 && (
        <motion.div
          className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/50"
          animate={{
            left: trail[trail.length - 1]?.x || 0,
            top: trail[trail.length - 1]?.y || 0,
          }}
          transition={{ duration: 0.05 }}
        />
      )}
    </div>
  );
};

export default CursorTrail;
