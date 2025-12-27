import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import profileImage from '@/assets/profile.png';

const MorphingProfile = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Get the positions of hero and about sections
  const [heroBottom, setHeroBottom] = useState(0);
  const [aboutTop, setAboutTop] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    
    const updatePositions = () => {
      const heroSection = document.getElementById('home');
      const aboutSection = document.getElementById('about');
      
      if (heroSection && aboutSection) {
        setHeroBottom(heroSection.offsetTop + heroSection.offsetHeight);
        setAboutTop(aboutSection.offsetTop);
      }
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  // Calculate the scroll range for the morph effect
  const scrollStart = heroBottom - 400;
  const scrollEnd = aboutTop + 200;

  // Transform values based on scroll
  const opacity = useTransform(
    scrollY,
    [scrollStart, scrollStart + 100, scrollEnd - 100, scrollEnd],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollY,
    [scrollStart, scrollEnd],
    [1, 3]
  );

  const x = useTransform(
    scrollY,
    [scrollStart, scrollEnd],
    ['0%', '30%']
  );

  const y = useTransform(
    scrollY,
    [scrollStart, scrollEnd],
    ['0vh', '20vh']
  );

  const grayscale = useTransform(
    scrollY,
    [scrollStart, scrollEnd],
    [0, 1]
  );

  const imageOpacity = useTransform(
    scrollY,
    [scrollStart, scrollEnd],
    [1, 0.4]
  );

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none hidden lg:block"
      style={{ opacity }}
    >
      <motion.div
        className="relative"
        style={{ scale, x, y }}
      >
        <motion.div
          className="w-32 h-32 rounded-full overflow-hidden border-2 border-foreground/20"
          style={{ 
            filter: useTransform(grayscale, (g) => `grayscale(${g})`),
            opacity: imageOpacity
          }}
        >
          <img 
            src={profileImage} 
            alt="Vishwa Kumar" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MorphingProfile;