import { Variants, Transition } from 'framer-motion';

// Spring physics presets - motion.dev style
export const springPresets = {
  gentle: { type: 'spring', stiffness: 120, damping: 14 } as Transition,
  bouncy: { type: 'spring', stiffness: 300, damping: 10 } as Transition,
  stiff: { type: 'spring', stiffness: 400, damping: 30 } as Transition,
  slow: { type: 'spring', stiffness: 100, damping: 20 } as Transition,
  smooth: { type: 'spring', stiffness: 200, damping: 25 } as Transition,
};

// Easing presets
export const easingPresets = {
  easeOutExpo: [0.16, 1, 0.3, 1] as const,
  easeOutQuart: [0.25, 1, 0.5, 1] as const,
  easeInOutQuint: [0.83, 0, 0.17, 1] as const,
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
};

// Container variants with stagger
export const staggerContainer = (
  staggerChildren = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: staggerChildren / 2,
      staggerDirection: -1,
    },
  },
});

// Fade up animation
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easingPresets.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Scale up animation
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      ...springPresets.bouncy,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

// Slide in from direction
export const slideIn = (
  direction: 'left' | 'right' | 'up' | 'down' = 'up',
  distance = 100
): Variants => {
  const directions = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
  };

  return {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easingPresets.easeOutExpo,
      },
    },
    exit: {
      opacity: 0,
      ...directions[direction],
      transition: {
        duration: 0.3,
      },
    },
  };
};

// Letter by letter animation variants
export const letterAnimation: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: easingPresets.easeOutExpo,
    },
  }),
};

// Word by word animation
export const wordAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.08,
      ease: easingPresets.easeOutQuart,
    },
  }),
};

// Blur in animation
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: easingPresets.easeOutQuart,
    },
  },
};

// Rotate in animation
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      ...springPresets.gentle,
    },
  },
};

// Flip animation
export const flipIn: Variants = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: easingPresets.easeOutBack,
    },
  },
};

// Card hover effect
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    transition: springPresets.smooth,
  },
  hover: {
    scale: 1.02,
    y: -8,
    transition: springPresets.smooth,
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

// Button hover effect
export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: springPresets.bouncy },
  tap: { scale: 0.95 },
};

// Icon hover effect
export const iconHover = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.2, rotate: 5, transition: springPresets.bouncy },
  tap: { scale: 0.9 },
};

// Underline hover effect (for links)
export const underlineHover = {
  rest: { scaleX: 0, originX: 0 },
  hover: { scaleX: 1, transition: { duration: 0.3, ease: easingPresets.easeOutQuart } },
};

// Pulse animation
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Float animation
export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Glow pulse animation
export const glowPulse: Variants = {
  initial: { opacity: 0.5, scale: 1 },
  animate: {
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Parallax scroll effect helper
export const getParallaxStyle = (scrollY: number, speed: number = 0.1) => ({
  transform: `translateY(${scrollY * speed}px)`,
});

// Viewport animation settings
export const viewportSettings = {
  once: true,
  amount: 0.3,
  margin: '-100px',
};
