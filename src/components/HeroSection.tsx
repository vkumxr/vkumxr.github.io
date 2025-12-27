import { Github, Linkedin, Mail, ArrowDown, FileText, Twitter, Instagram, BookOpen } from 'lucide-react';
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
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle - top right */}
        <div className="absolute -top-20 -right-20 w-64 h-64 border border-foreground/10 rounded-full animate-float-slow" />
        
        {/* Small circle - bottom left */}
        <div className="absolute bottom-32 left-16 w-24 h-24 border border-foreground/5 rounded-full animate-float-medium" />
        
        {/* Square - top left */}
        <div className="absolute top-40 left-[10%] w-16 h-16 border border-foreground/5 rotate-45 animate-float-reverse" />
        
        {/* Rectangle - right side */}
        <div className="absolute top-1/2 right-[15%] w-8 h-20 border border-foreground/5 animate-float-slow" />
        
        {/* Small square - bottom right */}
        <div className="absolute bottom-40 right-[25%] w-12 h-12 border border-foreground/10 rotate-12 animate-float-medium" />
        
        {/* Tiny circles scattered */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-foreground/5 rounded-full animate-float-reverse" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-foreground/10 rounded-full animate-float-slow" />
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-foreground/5 rounded-full animate-float-medium" />
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