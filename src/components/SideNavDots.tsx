import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home', isDark: false },
  { id: 'about', label: 'About', isDark: true },
  { id: 'skills', label: 'Skills', isDark: false },
  { id: 'experience', label: 'Experience', isDark: true },
  { id: 'projects', label: 'Projects', isDark: false },
  { id: 'contact', label: 'Contact', isDark: true },
];

const SideNavDots = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [isOnDarkSection, setIsOnDarkSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dots after scrolling past hero
      setIsVisible(window.scrollY > 200);

      // Find active section
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id);
            setIsOnDarkSection(section.isDark);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  // Colors based on current section background
  const dotColor = isOnDarkSection ? 'border-background' : 'border-foreground';
  const dotActiveColor = isOnDarkSection ? 'bg-background border-background' : 'bg-foreground border-foreground';
  const dotHoverColor = isOnDarkSection ? 'hover:border-background/70' : 'hover:border-foreground/70';
  const dotInactiveColor = isOnDarkSection ? 'border-background/40' : 'border-foreground/40';
  const lineColor = isOnDarkSection ? 'bg-background/20' : 'bg-foreground/20';
  const tooltipBg = isOnDarkSection ? 'bg-background text-foreground' : 'bg-foreground text-background';

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-3"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center"
          aria-label={`Go to ${section.label}`}
        >
          {/* Label tooltip */}
          <span className={`absolute right-6 px-2 py-1 rounded ${tooltipBg} text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg`}>
            {section.label}
          </span>
          
          {/* Dot */}
          <motion.div
            className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-300 ${
              activeSection === section.id
                ? `${dotActiveColor} scale-125`
                : `bg-transparent ${dotInactiveColor} ${dotHoverColor}`
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        </button>
      ))}
      
      {/* Connecting line */}
      <div className={`absolute top-0 bottom-0 right-[4px] w-px ${lineColor} -z-10 transition-colors duration-300`} />
    </motion.nav>
  );
};

export default SideNavDots;
