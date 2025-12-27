import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-foreground text-background shadow-lg hover:scale-110 transition-transform duration-200 group"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-foreground/20 blur-md -z-10 group-hover:bg-foreground/30 transition-colors" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
