import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { easingPresets, springPresets } from '@/hooks/useMotionAnimations';

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animation?: 'letter' | 'word' | 'line' | 'blur' | 'slide';
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export const AnimatedText = ({
  children,
  className = '',
  as: Component = 'span',
  animation = 'letter',
  delay = 0,
  stagger = 0.03,
  once = true,
}: AnimatedTextProps) => {
  const MotionComponent = motion[Component] as typeof motion.span;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const getItemVariants = () => {
    switch (animation) {
      case 'letter':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.5,
              ease: easingPresets.easeOutExpo,
            },
          },
        };
      case 'word':
        return {
          hidden: { opacity: 0, y: 30, rotateX: 45 },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
              duration: 0.6,
              ease: easingPresets.easeOutBack,
            },
          },
        };
      case 'blur':
        return {
          hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
          visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
              duration: 0.6,
              ease: easingPresets.easeOutQuart,
            },
          },
        };
      case 'slide':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              ...springPresets.gentle,
            },
          },
        };
      case 'line':
        return {
          hidden: { opacity: 0, y: '100%' },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.7,
              ease: easingPresets.easeOutExpo,
            },
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const itemVariants = getItemVariants();

  if (animation === 'letter') {
    return (
      <MotionComponent
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.5 }}
        aria-label={children}
      >
        {children.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block"
            style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  if (animation === 'word') {
    const words = children.split(' ');
    return (
      <MotionComponent
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.5 }}
        aria-label={children}
        style={{ perspective: 1000 }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={itemVariants}
            className="inline-block mr-[0.25em]"
            style={{ transformOrigin: 'bottom center' }}
          >
            {word}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  if (animation === 'line') {
    return (
      <span className={`overflow-hidden inline-block ${className}`}>
        <motion.span
          className="inline-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once, amount: 0.5 }}
          variants={itemVariants}
          style={{ transitionDelay: `${delay}s` }}
        >
          {children}
        </motion.span>
      </span>
    );
  }

  // Default for blur and slide
  return (
    <MotionComponent
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
    >
      {children.split(' ').map((word, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
};

// Animated counter component - motion.dev style
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export const AnimatedCounter = ({
  value,
  duration = 2,
  className = '',
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={springPresets.bouncy}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

// Typewriter effect
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export const Typewriter = ({
  text,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTyping) {
          setIsTyping(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isTyping]);

  useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isTyping, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Cycling Typewriter - types, deletes, and cycles through phrases
interface CyclingTypewriterProps {
  phrases: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  cursor?: boolean;
}

export const CyclingTypewriter = ({
  phrases,
  className = '',
  typeSpeed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  cursor = true,
}: CyclingTypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }
      const deleteTimeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(deleteTimeout);
    }

    if (displayText.length === currentPhrase.length) {
      setIsPaused(true);
      return;
    }

    const typeTimeout = setTimeout(() => {
      setDisplayText(currentPhrase.slice(0, displayText.length + 1));
    }, typeSpeed);
    return () => clearTimeout(typeTimeout);
  }, [displayText, phraseIndex, isDeleting, isPaused, phrases, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="ml-0.5 inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default AnimatedText;
