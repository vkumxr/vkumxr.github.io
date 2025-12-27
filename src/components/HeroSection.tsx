import { Github, Linkedin, Mail, FileText, ArrowDown, Briefcase } from 'lucide-react';
import NetworkBackground from './NetworkBackground';

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/vishwakumarv/',
    label: 'LinkedIn',
  },
  {
    icon: Github,
    href: 'https://github.com/vkumxr',
    label: 'GitHub',
  },
  {
    icon: Mail,
    href: 'mailto:vishwakumarv05@gmail.com',
    label: 'Email',
  },
  {
    icon: FileText,
    href: '/VISHWA-RESUME.pdf',
    label: 'Resume',
    download: true,
  },
];

const HeroSection = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 bg-foreground text-background overflow-hidden"
    >
      <NetworkBackground variant="dark" />
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Greeting */}
        <div className="overflow-hidden mb-6">
          <p className="animate-fade-up text-background/50 text-sm tracking-[0.3em] uppercase">
            Hello, I'm
          </p>
        </div>

        {/* Name */}
        <div className="overflow-hidden mb-8">
          <h1 className="animate-fade-up-delay-1 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Vishwa Kumar
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <p className="animate-fade-up-delay-2 text-3xl sm:text-4xl md:text-5xl font-light text-background/70 tracking-tight">
            Venkateswaran
          </p>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mb-12">
          <p className="animate-fade-up-delay-3 text-lg sm:text-xl text-background/60 max-w-2xl mx-auto leading-relaxed">
            Engineering student specializing in AI-driven systems, cybersecurity, and scalable backend development.
          </p>
        </div>

        {/* Social Links */}
        <div className="animate-fade-up-delay-4 flex items-center justify-center gap-4 mb-12">
          {socialLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target={link.download ? '_self' : '_blank'}
              rel="noopener noreferrer"
              download={link.download ? true : undefined}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-background/10 border border-background/20 text-background/60 hover:border-background/50 hover:text-background hover:bg-background/20 transition-all duration-300 hover:scale-110"
              aria-label={link.label}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-up-delay-5 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-background/30 text-background font-medium hover:bg-background/10 transition-all duration-300 hover:border-background/50"
          >
            View Projects
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
          
          <a
            href="https://www.linkedin.com/in/vishwakumarv/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-foreground font-semibold hover:bg-background/90 transition-all duration-300 hover:scale-105"
          >
            <Briefcase size={18} />
            Hire Me
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up-delay-5">
        <div className="w-6 h-10 rounded-full border-2 border-background/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-background/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
