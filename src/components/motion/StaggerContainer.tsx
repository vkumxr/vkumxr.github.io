import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { easingPresets, springPresets } from '@/hooks/useMotionAnimations';

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'slideLeft' | 'slideRight' | 'blur';
}

const getAnimation = (animation: StaggerContainerProps['animation']): Variants => {
  switch (animation) {
    case 'fadeUp':
      return {
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: easingPresets.easeOutExpo,
          },
        },
      };
    case 'scaleUp':
      return {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: springPresets.bouncy,
        },
      };
    case 'slideLeft':
      return {
        hidden: { opacity: 0, x: 60 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            ease: easingPresets.easeOutExpo,
          },
        },
      };
    case 'slideRight':
      return {
        hidden: { opacity: 0, x: -60 },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            ease: easingPresets.easeOutExpo,
          },
        },
      };
    case 'blur':
      return {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
          transition: {
            duration: 0.5,
          },
        },
      };
    case 'fadeIn':
    default:
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        },
      };
  }
};

export const StaggerContainer = ({
  children,
  className = '',
  stagger = 0.1,
  delay = 0,
  once = true,
  animation = 'fadeUp',
}: StaggerContainerProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// Stagger item to use inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  animation?: StaggerContainerProps['animation'];
}

export const StaggerItem = ({
  children,
  className = '',
  animation = 'fadeUp',
}: StaggerItemProps) => {
  const itemVariants = getAnimation(animation);

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// Reveal animation wrapper
interface RevealProps {
  children: ReactNode;
  className?: string;
  width?: 'fit-content' | '100%';
  delay?: number;
}

export const Reveal = ({
  children,
  className = '',
  width = 'fit-content',
  delay = 0,
}: RevealProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width }}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.5,
          delay,
          ease: easingPresets.easeOutExpo,
        }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-foreground z-10"
        initial={{ left: 0 }}
        whileInView={{ left: '100%' }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.3,
          ease: easingPresets.easeOutExpo,
        }}
      />
    </div>
  );
};

// List stagger animation
interface StaggerListProps {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
  stagger?: number;
  animation?: StaggerContainerProps['animation'];
}

export const StaggerList = ({
  items,
  className = '',
  itemClassName = '',
  stagger = 0.1,
  animation = 'fadeUp',
}: StaggerListProps) => {
  return (
    <StaggerContainer className={className} stagger={stagger} animation={animation}>
      {items.map((item, index) => (
        <StaggerItem key={index} className={itemClassName} animation={animation}>
          {item}
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

// Animate presence wrapper for exit animations
interface AnimatedPresenceProps {
  children: ReactNode;
  mode?: 'wait' | 'popLayout' | 'sync';
}

export const AnimatedPresenceWrapper = ({
  children,
  mode = 'wait',
}: AnimatedPresenceProps) => {
  return <AnimatePresence mode={mode}>{children}</AnimatePresence>;
};

export default StaggerContainer;
