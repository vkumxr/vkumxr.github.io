import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import profileImage from '@/assets/profile.png';

const AboutSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useScrollY();

  return (
    <section ref={sectionRef} id="about" className="py-24 md:py-32 px-6 section-dark overflow-hidden relative grid-bg-light">
      {/* Gradient orbs with parallax */}
      <div 
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-background/5 rounded-full blur-3xl pointer-events-none transition-transform duration-100"
        style={{ transform: `translate(${scrollY * -0.04}px, ${scrollY * 0.02}px)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-background/3 rounded-full blur-3xl pointer-events-none transition-transform duration-100"
        style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.03}px)` }}
      />

      <div ref={ref} className={`container mx-auto max-w-6xl relative z-10 ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        {/* Centered Header */}
        <div className="section-header text-center mb-12">
          <p className="section-label text-background/60">Get to know me</p>
          <h2 className="section-title shimmer-text-light">About</h2>
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left side - Content */}
          <div className="relative z-10 lg:w-1/2">

            <div className="space-y-6 text-lg leading-relaxed text-background/70">
              <p className={`transition-all duration-700 delay-100 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                I'm an engineering student with a focus on building{' '}
                <span className="text-background font-medium">intelligent tools</span> that actually work in the real world.
                My interests span AI-driven systems, backend development, and cybersecurity—three areas that, when combined, 
                create software that's both smart and secure.
              </p>
              
              <p className={`transition-all duration-700 delay-200 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                I run <span className="text-background font-medium">Linux as my primary OS</span>, not because it's trendy, 
                but because I want to understand what's happening under the hood. From writing BASH scripts to automate 
                repetitive tasks to debugging embedded systems on Raspberry Pi, I'm drawn to problems that require 
                digging deeper than surface-level solutions.
              </p>
              
              <p className={`transition-all duration-700 delay-300 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                My projects reflect this approach: a{' '}
                <span className="text-background font-medium">reverse engineering framework</span> for Android apps, 
                a <span className="text-background font-medium">conversational banking assistant</span> powered by LLMs, 
                and a <span className="text-background font-medium">modular robotics system</span> with voice control.
                Each one started with a practical problem and ended with working code.
              </p>

              <p className={`transition-all duration-700 delay-[400ms] ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                When I'm not coding, I'm usually exploring CTF challenges, learning about network protocols, 
                or experimenting with new automation workflows.
              </p>
            </div>
          </div>

          {/* Profile Photo with Gradient - Now visible on all screen sizes */}
          <div className="mt-8 lg:mt-0 lg:w-1/2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
            <div className="relative w-full h-[300px] lg:h-[600px]">
              {/* Mobile gradient - top to bottom fade */}
              <div 
                className="absolute inset-0 z-10 lg:hidden"
                style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, hsl(var(--foreground)) 100%)' }}
              />
              {/* Desktop gradient - left fade */}
              <div 
                className="absolute inset-0 z-10 hidden lg:block"
                style={{ background: 'linear-gradient(to left, transparent 0%, transparent 30%, hsl(var(--foreground)) 100%)' }}
              />
              <img 
                src={profileImage} 
                alt="Vishwa Kumar" 
                className="w-full h-full object-cover object-top lg:object-center opacity-40 grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
