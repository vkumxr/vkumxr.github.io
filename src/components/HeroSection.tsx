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
      className="relative min-h-screen flex items-center justify-center px-6 bg-[hsl(0,0%,8%)] text-[hsl(0,0%,98%)]"
    >
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Profile Image */}
        <div className="mb-8 animate-fade-up">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-white/20">
            <img 
              src={profileImage} 
              alt="Vishwa Kumar - AI & Cybersecurity Engineer" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white">
          Vishwa Kumar Venkateswaran
        </h1>

        {/* Tagline */}
        <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
          Engineering student specializing in AI-driven systems, cybersecurity, and scalable backend development.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* View Projects - Left */}
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-200"
          >
            View Projects
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          
          {/* Hire Me - Center with glowing border */}
          <button
            onClick={openLinkedIn}
            className="relative group inline-flex items-center justify-center px-8 py-3 rounded-md bg-white text-[hsl(0,0%,8%)] font-semibold transition-all duration-200 hover:scale-105"
            style={{
              boxShadow: '0 0 12px rgba(255,255,255,0.25), 0 0 24px rgba(255,255,255,0.15)',
              animation: 'pulseGlow 2.5s ease-in-out infinite',
            }}
          >
            Hire Me
          </button>

          {/* View Resume - Right */}
          <button
            onClick={openResume}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-200"
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
              className="social-icon-inverted"
              aria-label={link.label}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up-delay-5">
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1.5">
          <div className="w-0.5 h-1.5 rounded-full bg-white/50 animate-bounce" />
        </div>
      </div>

      {/* Glowing animation keyframes */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(255,255,255,0.25), 0 0 24px rgba(255,255,255,0.15);
          }
          50% {
            box-shadow: 0 0 18px rgba(255,255,255,0.35), 0 0 32px rgba(255,255,255,0.2);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;