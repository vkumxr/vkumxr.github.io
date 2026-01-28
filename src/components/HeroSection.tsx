import { Github, Linkedin, Mail, ArrowDown, FileText, Twitter, Instagram, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profileImage from '@/assets/profile.png';
import { MagneticWrapper } from './motion/MagneticButton';
import { AnimatedText, Typewriter, CyclingTypewriter } from './motion/AnimatedText';
import { springPresets, easingPresets } from '@/hooks/useMotionAnimations';
import { HeroDecorations } from './DecorativeShapes';
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
    icon: Twitter,
    href: 'https://x.com/vkumxrr',
    label: 'Twitter',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/vishwakumar_vk/',
    label: 'Instagram',
  },
  {
    icon: BookOpen,
    href: 'https://substack.com/@vkumxr',
    label: 'Substack',
  },
  {
    icon: Mail,
    href: 'mailto:vishwakumarv05@gmail.com',
    label: 'Email',
  },
];

const devCommandsRight = [
  'npm run dev',
  'git commit -m "feat"',
  'npm install react',
  'git push origin main',
];

const devCommandsLeft = [
  'npm run build',
  'git clone repo',
  'yarn add axios',
  'npm install -D',
];

const sudoCommandsTopRight = [
  'sudo apt update',
  'sudo systemctl start',
  'sudo chmod 755',
  'sudo service restart',
];

const sudoCommandsBottomLeft = [
  'sudo apt install',
  'sudo rm -rf node_modules',
  'sudo nano config',
  'sudo ufw enable',
];

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rightCommandIndex, setRightCommandIndex] = useState(0);
  const [leftCommandIndex, setLeftCommandIndex] = useState(0);
  const [sudoTopRightIndex, setSudoTopRightIndex] = useState(0);
  const [sudoBottomLeftIndex, setSudoBottomLeftIndex] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const rightInterval = setInterval(() => {
      setRightCommandIndex((prev) => (prev + 1) % devCommandsRight.length);
    }, 4000);
    const leftInterval = setInterval(() => {
      setLeftCommandIndex((prev) => (prev + 1) % devCommandsLeft.length);
    }, 3500);
    const sudoTopRightInterval = setInterval(() => {
      setSudoTopRightIndex((prev) => (prev + 1) % sudoCommandsTopRight.length);
    }, 4500);
    const sudoBottomLeftInterval = setInterval(() => {
      setSudoBottomLeftIndex((prev) => (prev + 1) % sudoCommandsBottomLeft.length);
    }, 3800);
    return () => {
      clearInterval(rightInterval);
      clearInterval(leftInterval);
      clearInterval(sudoTopRightInterval);
      clearInterval(sudoBottomLeftInterval);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openResume = () => {
    window.open('/VISHWA-RESUME.pdf', '_blank');
  };

  const openLinkedIn = () => {
    window.open('https://linkedin.com/in/vishwakumarv/', '_blank');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.03,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const heroTitle = "Vishwa Kumar Venkateswaran";
  const focusAreas = [
    "Understanding how systems break and how to secure them.",
    "Building tools that dig deeper than surface-level solutions.",
    "Reverse engineering, tooling, and system security.",
    "AI-driven security and backend development.",
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 section-light overflow-hidden"
    >
      {/* Decorative geometric shapes */}
      <HeroDecorations />
      
      {/* Noise/Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture" style={{ zIndex: 1 }} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-foreground/5 pointer-events-none" style={{ zIndex: 1 }} />
      
      {/* Floating Code/Tech Elements with Parallax - positioned above 3D */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        {/* Code brackets - top right */}
        <motion.div 
          className="absolute top-20 right-[10%] text-foreground/10 md:text-foreground/15 font-mono text-3xl md:text-6xl select-none pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {'{ }'}
        </motion.div>
        
        {/* HTML tag - bottom left */}
        <motion.div 
          className="absolute bottom-32 left-[8%] text-foreground/10 md:text-foreground/15 font-mono text-xl md:text-3xl select-none pointer-events-none"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {'</>'}
        </motion.div>
        
        {/* Terminal prompt - right side - hidden on mobile for cleaner look */}
        <motion.div 
          className="absolute top-1/2 right-[10%] text-foreground/15 font-mono text-sm md:text-base select-none pointer-events-none hidden sm:block"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-foreground/20">$</span>
            <span key={rightCommandIndex} className="typing-animation inline-block">
              {devCommandsRight[rightCommandIndex]}
            </span>
          </div>
        </motion.div>
        
        {/* Arrow function - center right */}
        <motion.div 
          className="absolute top-[65%] right-[30%] md:right-[35%] text-foreground/10 md:text-foreground/15 font-mono text-base md:text-lg select-none pointer-events-none"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {'=>'}
        </motion.div>
        
        {/* Semicolon - top center */}
        <motion.div 
          className="absolute top-[15%] left-1/2 text-foreground/10 md:text-foreground/15 font-mono text-3xl md:text-5xl select-none pointer-events-none"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ;
        </motion.div>
      </div>
      <motion.div 
        className="container mx-auto max-w-4xl text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Image */}
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.div 
            className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-foreground/20"
            whileHover={{ scale: 1.05, borderColor: 'hsl(var(--foreground) / 0.4)' }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={profileImage} 
              alt="Vishwa Kumar Venkateswaran - AI & Cybersecurity Engineer" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Main H1 for SEO - Two line name display */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-foreground overflow-hidden text-center">
          <span className="block">
            {"Vishwa Kumar".split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.03 }}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1 text-muted-foreground">
            {"Venkateswaran".split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + i * 0.03 }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Engineering student focused on{' '}
          <CyclingTypewriter 
            phrases={focusAreas} 
            typeSpeed={50} 
            deleteSpeed={25} 
            pauseDuration={2500}
            className="text-foreground"
          />
        </motion.p>

        {/* CTAs */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {/* View Projects - Left */}
          <motion.button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md border border-foreground/30 text-foreground font-medium hover:bg-foreground/10 transition-colors duration-200"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View Projects
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </motion.button>
          
          {/* Hire Me - Center with squircle running glow border */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -inset-[3px] rounded-lg bg-gradient-to-r from-foreground via-foreground/50 to-foreground opacity-75 blur-sm animate-pulse" />
            <div className="absolute -inset-[2px] rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-conic from-transparent via-foreground to-transparent animate-spin-slow" 
                   style={{ animationDuration: '3s' }} />
            </div>
            <button
              onClick={openLinkedIn}
              className="relative inline-flex items-center justify-center px-8 py-3 rounded-md bg-foreground text-background font-semibold transition-all duration-200"
            >
              Hire Me
            </button>
          </motion.div>

          {/* Download Resume - Right */}
          <motion.a
            href="/VISHWA-RESUME.pdf"
            download="Vishwa_Kumar_Venkateswaran_Resume.pdf"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md border border-foreground/30 text-foreground font-medium hover:bg-foreground/10 transition-colors duration-200"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText size={18} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social Links with Magnetic Effect */}
        <motion.div 
          className="flex items-center justify-center gap-4"
          variants={itemVariants}
        >
          {socialLinks.map((link, index) => (
            <MagneticWrapper key={link.label} strength={0.4} radius={100}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={link.label}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.8 + index * 0.1, 
                  ...springPresets.bouncy,
                }}
                whileHover={{ scale: 1.2, y: -3 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon size={20} />
              </motion.a>
            </MagneticWrapper>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div 
          className="w-5 h-8 rounded-full border border-foreground/30 flex items-start justify-center p-1.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div 
            className="w-0.5 h-1.5 rounded-full bg-foreground/50"
            animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;