import { Github, Linkedin, Mail, ArrowDown, Briefcase } from 'lucide-react';
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

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
          Vishwa Kumar
        </h1>

        {/* Tagline */}
        <p className="animate-fade-up-delay-2 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
          Engineering student specializing in AI-driven systems, cybersecurity, and scalable backend development.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-md border border-white/30 text-white font-medium hover:bg-white/10 transition-all duration-200"
          >
            View Projects
            <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-md bg-white text-[hsl(0,0%,8%)] font-semibold hover:bg-white/90 transition-all duration-200"
          >
            <Briefcase size={18} />
            Hire Me
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
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/30 text-white/70 hover:border-white hover:text-white transition-all duration-200"
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
    </section>
  );
};

export default HeroSection;
