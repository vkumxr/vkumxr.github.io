import { Github, Linkedin, Mail, ArrowDown, FileText, Twitter, Instagram, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import profileImage from '@/assets/profile.png';

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

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 section-light overflow-hidden"
    >
      {/* Noise/Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none noise-texture" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/[0.02] to-foreground/5 pointer-events-none" />
      
      {/* Floating Code/Tech Elements with Parallax - Hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        {/* Code brackets - top right */}
        <div 
          className="absolute top-20 right-[10%] text-foreground/10 font-mono text-6xl animate-float-slow transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` }}
        >
          {'{ }'}
        </div>
        
        {/* HTML tag - bottom left */}
        <div 
          className="absolute bottom-32 left-[8%] text-foreground/8 font-mono text-3xl animate-float-medium transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` }}
        >
          {'</>'}
        </div>
        
        {/* Binary code - top left */}
        <div 
          className="absolute top-32 left-[15%] text-foreground/6 font-mono text-sm animate-float-reverse transition-transform duration-300 ease-out select-none leading-tight"
          style={{ transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` }}
        >
          01101<br/>10010<br/>01011
        </div>
        
        {/* Terminal prompt - right side */}
        <div 
          className="absolute top-1/2 right-[12%] text-foreground/8 font-mono text-2xl animate-float-slow transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)` }}
        >
          ~/dev $
        </div>
        
        {/* Array brackets - bottom right */}
        <div 
          className="absolute bottom-40 right-[25%] text-foreground/10 font-mono text-4xl animate-float-medium transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * 18}px)` }}
        >
          [ ]
        </div>
        
        {/* Function syntax - scattered */}
        <div 
          className="absolute top-1/4 left-1/4 text-foreground/6 font-mono text-xs animate-float-reverse transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` }}
        >
          {'() => {}'}
        </div>
        <div 
          className="absolute top-2/3 right-1/3 text-foreground/8 font-mono text-lg animate-float-slow transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px)` }}
        >
          #
        </div>
        <div 
          className="absolute bottom-1/4 left-1/3 text-foreground/6 font-mono text-sm animate-float-medium transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)` }}
        >
          {'/**'}
        </div>
        
        {/* Semicolon - top center */}
        <div 
          className="absolute top-[15%] left-1/2 text-foreground/10 font-mono text-5xl animate-float-medium transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)` }}
        >
          ;
        </div>
        
        {/* Import statement - bottom center */}
        <div 
          className="absolute bottom-[20%] left-[45%] text-foreground/5 font-mono text-xs animate-float-reverse transition-transform duration-300 ease-out select-none"
          style={{ transform: `translate(${mousePosition.x * 14}px, ${mousePosition.y * 14}px)` }}
        >
          import * from
        </div>
      </div>
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Profile Image */}
        <div className="mb-8 animate-fade-up">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-foreground/20">
            <img 
              src={profileImage} 
              alt="Vishwa Kumar - AI & Cybersecurity Engineer" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground">
          Vishwa Kumar Venkateswaran
        </h1>

        {/* Tagline */}
        <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          Engineering student specializing in AI-driven systems, cybersecurity, and scalable backend development.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* View Projects - Left */}
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md border border-foreground/30 text-foreground font-medium hover:bg-foreground/10 transition-all duration-200"
          >
            View Projects
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          
          {/* Hire Me - Center with glowing border */}
          <button
            onClick={openLinkedIn}
            className="relative group inline-flex items-center justify-center px-8 py-3 rounded-md bg-foreground text-background font-semibold transition-all duration-200 hover:scale-105 shadow-[0_0_12px_rgba(0,0,0,0.25),0_0_24px_rgba(0,0,0,0.15)]"
          >
            Hire Me
          </button>

          {/* View Resume - Right */}
          <button
            onClick={openResume}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md border border-foreground/30 text-foreground font-medium hover:bg-foreground/10 transition-all duration-200"
          >
            <FileText size={18} />
            View Resume
          </button>
        </div>

        {/* Social Links */}
        <div className="animate-fade-up-delay-4 flex items-center justify-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label={link.label}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up-delay-5">
        <div className="w-5 h-8 rounded-full border border-foreground/30 flex items-start justify-center p-1.5">
          <div className="w-0.5 h-1.5 rounded-full bg-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;