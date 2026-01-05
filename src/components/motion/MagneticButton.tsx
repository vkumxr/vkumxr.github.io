import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: 'button' | 'a' | 'div';
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

export const MagneticButton = ({
  children,
  className = '',
  strength = 0.3,
  radius = 200,
  as: Component = 'button',
  onClick,
  href,
  target,
  rel,
  disabled = false,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      const factor = 1 - distance / radius;
      x.set(distanceX * strength * factor);
      y.set(distanceY * strength * factor);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const MotionComponent = motion[Component] as typeof motion.button;

  const props = {
    ref: ref as any,
    className,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    onClick,
    ...(Component === 'a' && { href, target, rel }),
    ...(Component === 'button' && { disabled }),
  };

  return <MotionComponent {...props}>{children}</MotionComponent>;
};

// Magnetic wrapper for existing elements
interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export const MagneticWrapper = ({
  children,
  strength = 0.2,
  radius = 150,
  className = '',
}: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      const factor = 1 - distance / radius;
      x.set(distanceX * strength * factor);
      y.set(distanceY * strength * factor);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// Cursor follower effect
interface CursorFollowerProps {
  className?: string;
  size?: number;
  delay?: number;
}

export const CursorFollower = ({
  className = '',
  size = 20,
  delay = 0.1,
}: CursorFollowerProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    x.set(e.clientX - size / 2);
    y.set(e.clientY - size / 2);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove);
  }

  return (
    <motion.div
      className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference ${className}`}
      style={{
        x: springX,
        y: springY,
        width: size,
        height: size,
        backgroundColor: 'white',
      }}
    />
  );
};

export default MagneticButton;
