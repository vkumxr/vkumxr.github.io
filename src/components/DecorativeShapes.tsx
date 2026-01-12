import { motion } from 'framer-motion';
import { useScrollY } from '../hooks/useParallax';

interface ShapeProps {
  className?: string;
  parallaxSpeed?: number;
  delay?: number;
}

const FloatingDot = ({ className = '', parallaxSpeed = 0.02, delay = 0 }: ShapeProps) => {
  const scrollY = useScrollY();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute w-2 h-2 rounded-full bg-foreground/20 pointer-events-none ${className}`}
      style={{ transform: `translateY(${scrollY * parallaxSpeed}px)` }}
    />
  );
};

const FloatingRing = ({ className = '', parallaxSpeed = 0.03, delay = 0 }: ShapeProps) => {
  const scrollY = useScrollY();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`absolute w-12 h-12 rounded-full border border-foreground/10 pointer-events-none ${className}`}
      style={{ transform: `translateY(${scrollY * parallaxSpeed}px)` }}
    />
  );
};

const FloatingSquare = ({ className = '', parallaxSpeed = -0.02, delay = 0 }: ShapeProps) => {
  const scrollY = useScrollY();
  
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 45 }}
      animate={{ opacity: 1, rotate: 45 }}
      transition={{ duration: 0.7, delay }}
      className={`absolute w-6 h-6 border border-foreground/10 pointer-events-none ${className}`}
      style={{ transform: `translateY(${scrollY * parallaxSpeed}px) rotate(45deg)` }}
    />
  );
};

const FloatingTriangle = ({ className = '', parallaxSpeed = 0.025, delay = 0 }: ShapeProps) => {
  const scrollY = useScrollY();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      className={`absolute pointer-events-none ${className}`}
      style={{ transform: `translateY(${scrollY * parallaxSpeed}px)` }}
    >
      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" className="text-foreground/10">
        <path d="M10 0L20 18H0L10 0Z" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  );
};

const FloatingCross = ({ className = '', parallaxSpeed = -0.015, delay = 0 }: ShapeProps) => {
  const scrollY = useScrollY();
  
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute pointer-events-none ${className}`}
      style={{ transform: `translateY(${scrollY * parallaxSpeed}px)` }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-foreground/15">
        <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="1" />
      </svg>
    </motion.div>
  );
};

const FloatingHexagon = ({ className = '', parallaxSpeed = 0.02, delay = 0 }: ShapeProps) => {
  const scrollY = useScrollY();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay }}
      className={`absolute pointer-events-none ${className}`}
      style={{ transform: `translateY(${scrollY * parallaxSpeed}px)` }}
    >
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none" className="text-foreground/10">
        <path d="M12 1L23 7.5V20.5L12 27L1 20.5V7.5L12 1Z" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  );
};

// Preset decorative layouts for different sections
export const HeroDecorations = () => (
  <>
    <FloatingRing className="top-32 right-[15%]" parallaxSpeed={0.03} delay={0.5} />
    <FloatingDot className="top-48 right-[25%]" parallaxSpeed={0.02} delay={0.6} />
    <FloatingSquare className="top-64 left-[10%]" parallaxSpeed={-0.02} delay={0.7} />
    <FloatingTriangle className="bottom-32 right-[20%]" parallaxSpeed={0.025} delay={0.8} />
    <FloatingCross className="top-40 left-[20%]" parallaxSpeed={-0.015} delay={0.4} />
  </>
);

export const AboutDecorations = () => (
  <>
    <FloatingHexagon className="top-20 right-[8%]" parallaxSpeed={0.02} delay={0.2} />
    <FloatingDot className="bottom-20 left-[12%]" parallaxSpeed={0.03} delay={0.3} />
    <FloatingRing className="bottom-32 right-[15%]" parallaxSpeed={-0.02} delay={0.4} />
  </>
);

export const SkillsDecorations = () => (
  <>
    <FloatingSquare className="top-16 left-[8%]" parallaxSpeed={0.02} delay={0.1} />
    <FloatingTriangle className="top-32 right-[10%]" parallaxSpeed={-0.025} delay={0.2} />
    <FloatingDot className="bottom-24 right-[18%]" parallaxSpeed={0.015} delay={0.3} />
  </>
);

export const ProjectsDecorations = () => (
  <>
    <FloatingRing className="top-24 left-[5%]" parallaxSpeed={0.03} delay={0.2} />
    <FloatingCross className="top-48 right-[8%]" parallaxSpeed={-0.02} delay={0.3} />
    <FloatingHexagon className="bottom-32 left-[10%]" parallaxSpeed={0.02} delay={0.4} />
    <FloatingDot className="bottom-48 right-[12%]" parallaxSpeed={-0.015} delay={0.5} />
  </>
);

export const ContactDecorations = () => (
  <>
    <FloatingTriangle className="top-20 left-[12%]" parallaxSpeed={0.02} delay={0.2} />
    <FloatingSquare className="top-32 right-[10%]" parallaxSpeed={-0.02} delay={0.3} />
    <FloatingRing className="bottom-24 left-[8%]" parallaxSpeed={0.025} delay={0.4} />
  </>
);

export {
  FloatingDot,
  FloatingRing,
  FloatingSquare,
  FloatingTriangle,
  FloatingCross,
  FloatingHexagon,
};
