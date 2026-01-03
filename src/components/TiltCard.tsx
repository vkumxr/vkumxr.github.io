import { useRef, useState, useEffect, ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glareEnabled?: boolean;
}

const TiltCard = ({ 
  children, 
  className = '', 
  tiltAmount = 10,
  glareEnabled = true 
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;
    
    setTransform({ rotateX, rotateY });
    setGlarePosition({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100 
    });
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: isHovering 
          ? `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(1.02, 1.02, 1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare effect overlay */}
      {glareEnabled && isHovering && !prefersReducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            transition: 'opacity 0.2s ease-out',
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
