import { Github, Linkedin, Mail, ArrowDown, FileText, Terminal, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyclingTypewriter } from './motion/AnimatedText';

const socialLinks = [
  { icon: Github, href: 'https://github.com/vkumxr', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/vishwakumarv/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:vishwakumarv05@gmail.com', label: 'Email' },
];

const HeroSection = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const bootTimer = setTimeout(() => setBootComplete(true), 1500);
    const contentTimer = setTimeout(() => setShowContent(true), 2000);
    return () => {
      clearTimeout(bootTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const focusAreas = [
    "Understanding how systems break and how to secure them.",
    "Building tools that dig deeper than surface-level solutions.",
    "Reverse engineering, tooling, and system security.",
    "Exploit analysis and vulnerability research.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 section-cyber overflow-hidden">
      {/* HUD corner elements */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />
      
      {/* Boot sequence overlay */}
      <AnimatePresence>
        {!bootComplete && (
          <motion.div
            className="absolute inset-0 bg-background z-50 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-sm space-y-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0 }}
                className="text-muted-foreground"
              >
                <span className="text-primary">[SYSTEM]</span> Initializing secure connection...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground"
              >
                <span className="text-accent">[ AUTH ]</span> Verifying credentials...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-muted-foreground"
              >
                <span className="text-primary">[ACCESS]</span> Granted
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-3"
              >
                <span className="text-muted-foreground">
                  <span className="text-accent">[ LOAD ]</span>
                </span>
                <motion.div className="h-1 w-32 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: 1 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div 
        className="container mx-auto max-w-4xl text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={showContent ? "visible" : "hidden"}
      >
        {/* System status indicator */}
        <motion.div 
          className="flex items-center justify-center gap-3 mb-8"
          variants={itemVariants}
        >
          <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            System Active • Secure Connection
          </span>
        </motion.div>

        {/* Identity header */}
        <motion.div className="mb-6" variants={itemVariants}>
          <div className="font-mono text-xs text-muted-foreground mb-3 tracking-widest">
            IDENTITY:
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold tracking-tight text-primary name-pulse">
            VISHWA KUMAR
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="font-mono text-xs text-muted-foreground mb-3 tracking-widest">
            ROLE:
          </div>
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-5 h-5 text-accent" />
            <span className="font-mono text-lg md:text-xl text-foreground">
              Cybersecurity & Reverse Engineering
            </span>
          </div>
        </motion.div>

        {/* Typing tagline */}
        <motion.div 
          className="mb-12 min-h-[60px]"
          variants={itemVariants}
        >
          <div className="font-mono text-base md:text-lg text-muted-foreground">
            <span className="text-primary">$</span>{' '}
            <CyclingTypewriter 
              phrases={focusAreas} 
              typeSpeed={40} 
              deleteSpeed={20} 
              pauseDuration={3000}
              className="text-foreground"
            />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          <motion.button
            onClick={scrollToProjects}
            className="cyber-button flex items-center gap-2 button-glow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Terminal size={18} />
            VIEW PROJECTS
          </motion.button>
          
          <motion.button
            onClick={scrollToContact}
            className="cyber-button-primary flex items-center gap-2 button-glow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Shield size={18} />
            ESTABLISH SECURE CHANNEL
          </motion.button>
        </motion.div>

        {/* Quick actions */}
        <motion.div 
          className="flex items-center justify-center gap-6 mb-12"
          variants={itemVariants}
        >
          <motion.a
            href="/VISHWA-RESUME.pdf"
            download="Vishwa_Kumar_Venkateswaran_Resume.pdf"
            className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors duration-300"
            whileHover={{ x: 2 }}
          >
            <FileText size={16} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex items-center justify-center gap-4"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={link.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <link.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">SCROLL</span>
          <ArrowDown size={16} className="text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;