import { Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profileImage from '@/assets/profile.png';
import { MagneticWrapper } from './motion/MagneticButton';
import { springPresets } from '@/hooks/useMotionAnimations';

const socialLinks = [
  {
    icon: Github,
    href: 'https://github.com/vkumxr',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/vishwakumarv/',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:vishwakumarv05@gmail.com',
    label: 'Email',
  },
];

const terminalCommands = [
  '$ nmap -sV target',
  '$ jadx -d output app.apk',
  '$ python3 redroid.py',
  '$ objdump -d binary',
];

const HeroSection = () => {
  const [commandIndex, setCommandIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCommandIndex((prev) => (prev + 1) % terminalCommands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 section-light overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      
      {/* Terminal command - floating */}
      <motion.div 
        className="absolute top-24 right-[10%] text-muted-foreground/40 font-mono text-sm select-none pointer-events-none hidden md:block"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="text-foreground/30">{terminalCommands[commandIndex]}</span>
      </motion.div>

      <motion.div 
        className="container mx-auto max-w-3xl text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div className="mb-6" variants={itemVariants}>
          <motion.div 
            className="w-28 h-28 mx-auto rounded-full overflow-hidden border border-border"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={profileImage} 
              alt="Vishwa Kumar Venkateswaran" 
              className="w-full h-full object-cover grayscale"
            />
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-foreground"
          variants={itemVariants}
        >
          Vishwa Kumar Venkateswaran
        </motion.h1>
        
        {/* Headline */}
        <motion.p 
          className="text-lg md:text-xl text-foreground font-medium mb-3"
          variants={itemVariants}
        >
          Building AI-powered tools for cybersecurity and reverse engineering
        </motion.p>

        {/* Subtitle */}
        <motion.p 
          className="text-sm md:text-base text-muted-foreground mb-8 max-w-xl mx-auto"
          variants={itemVariants}
        >
          Third-year ECE student focused on security engineering, reverse engineering, and intelligent automation.
        </motion.p>

        {/* CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          variants={itemVariants}
        >
          <motion.button
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
            <ArrowDown size={16} />
          </motion.button>
          
          <motion.a
            href="/VISHWA-RESUME.pdf"
            download="Vishwa_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText size={16} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex items-center justify-center gap-3"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => (
            <MagneticWrapper key={link.label} strength={0.3} radius={80}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-colors"
                aria-label={link.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, ...springPresets.bouncy }}
                whileHover={{ scale: 1.1 }}
              >
                <link.icon size={18} />
              </motion.a>
            </MagneticWrapper>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div 
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center p-1.5"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-0.5 h-1.5 rounded-full bg-muted-foreground"
            animate={{ y: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
