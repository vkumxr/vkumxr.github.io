import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';

// Parallax scroll effect
interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const Parallax = ({
  children,
  offset = 50,
  className = '',
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
};

// Scale on scroll
interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
}

export const ScaleOnScroll = ({
  children,
  className = '',
}: ScaleOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Rotate on scroll
interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  degrees?: number;
}

export const RotateOnScroll = ({
  children,
  className = '',
  degrees = 10,
}: RotateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-degrees, degrees]);

  return (
    <motion.div ref={ref} style={{ rotate }} className={className}>
      {children}
    </motion.div>
  );
};

// Horizontal scroll section
interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export const HorizontalScroll = ({
  children,
  className = '',
}: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={containerRef} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </section>
  );
};

// Scroll progress indicator
interface ScrollProgressProps {
  className?: string;
  color?: string;
}

export const ScrollProgressBar = ({
  className = '',
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-[3px] bg-foreground origin-left z-[60] ${className}`}
      style={{ scaleX }}
    />
  );
};

// Opacity on scroll (fade in/out based on scroll position)
interface OpacityOnScrollProps {
  children: ReactNode;
  className?: string;
  fadeIn?: boolean;
}

export const OpacityOnScroll = ({
  children,
  className = '',
  fadeIn = true,
}: OpacityOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(
    scrollYProgress,
    fadeIn ? [0, 0.3, 0.7, 1] : [0, 0.3, 0.7, 1],
    fadeIn ? [0, 1, 1, 0] : [1, 1, 0, 0]
  );

  return (
    <motion.div ref={ref} style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
};

// Perspective scroll effect
interface PerspectiveScrollProps {
  children: ReactNode;
  className?: string;
}

export const PerspectiveScroll = ({
  children,
  className = '',
}: PerspectiveScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className={`perspective-[1000px] ${className}`}>
      <motion.div
        ref={ref}
        style={{
          rotateX,
          scale,
          opacity,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Clip path reveal on scroll
interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
}

export const ClipReveal = ({
  children,
  className = '',
  direction = 'left',
}: ClipRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const clipPaths = {
    left: useTransform(scrollYProgress, [0, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']),
    right: useTransform(scrollYProgress, [0, 1], ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']),
    top: useTransform(scrollYProgress, [0, 1], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']),
    bottom: useTransform(scrollYProgress, [0, 1], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']),
  };

  return (
    <motion.div
      ref={ref}
      style={{ clipPath: clipPaths[direction] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Smooth scroll link
interface SmoothScrollLinkProps {
  children: ReactNode;
  to: string;
  className?: string;
  offset?: number;
}

export const SmoothScrollLink = ({
  children,
  to,
  className = '',
  offset = 0,
}: SmoothScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(to);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.a
      href={to}
      onClick={handleClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

export default Parallax;
