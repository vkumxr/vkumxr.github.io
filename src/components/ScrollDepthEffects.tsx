import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ScrollDepthEffectsProps {
  children: ReactNode;
}

// Hook to check for reduced motion preference
const useReducedMotion = () => {
  const prefersReducedMotion = useRef(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;
    
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
};

// Initialize global scroll depth effects
const ScrollDepthEffects = ({ children }: ScrollDepthEffectsProps) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion.current) return;

    // Create parallax effect for sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      // Subtle parallax for section backgrounds
      const parallaxElements = section.querySelectorAll('[data-parallax]');
      
      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-parallax') || '0.1');
        
        gsap.to(el, {
          y: () => speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      });

      // Fade in sections with depth effect
      gsap.fromTo(
        section,
        {
          opacity: 0.8,
          scale: 0.98,
        },
        {
          opacity: 1,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.3,
          },
        }
      );
    });

    // Create perspective depth effect for cards
    const cards = document.querySelectorAll('[data-depth-card]');
    
    cards.forEach((card, index) => {
      const delay = index * 0.05;
      
      gsap.fromTo(
        card,
        {
          y: 30,
          opacity: 0,
          rotateX: 5,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.6,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
};

// Hook for individual element parallax
export const useParallaxGSAP = (speed: number = 0.1) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion.current || !elementRef.current) return;

    const element = elementRef.current;
    
    gsap.to(element, {
      y: () => speed * window.innerHeight * 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return elementRef;
};

// Hook for fade-in on scroll
export const useFadeInOnScroll = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion.current || !elementRef.current) return;

    const element = elementRef.current;
    
    const directions = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: 40 },
      right: { y: 0, x: -40 },
    };
    
    const { x, y } = directions[direction];
    
    gsap.fromTo(
      element,
      {
        y,
        x,
        opacity: 0,
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction]);

  return elementRef;
};

export default ScrollDepthEffects;
