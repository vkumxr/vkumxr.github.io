import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import profileImage from '@/assets/profile.png';

const AboutSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [effectType, setEffectType] = useState<'gradient' | 'ghost'>('gradient');

  return (
    <section id="about" className="py-24 md:py-32 px-6 section-dark overflow-hidden">
      <div ref={ref} className={`container mx-auto max-w-6xl ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        
        {/* Demo Toggle - Remove this after choosing */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setEffectType('gradient')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              effectType === 'gradient' 
                ? 'bg-background text-foreground' 
                : 'bg-background/20 text-background/70 hover:bg-background/30'
            }`}
          >
            Gradient Fade Effect
          </button>
          <button
            onClick={() => setEffectType('ghost')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              effectType === 'ghost' 
                ? 'bg-background text-foreground' 
                : 'bg-background/20 text-background/70 hover:bg-background/30'
            }`}
          >
            Ghost Effect (Low Opacity)
          </button>
        </div>

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left side - Content */}
          <div className="relative z-10 lg:w-1/2">
            <div className="section-header lg:text-left">
              <p className="section-label">Get to know me</p>
              <h2 className="section-title">About</h2>
            </div>

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

          {/* Right side - Faded Profile Photo */}
          <div className="hidden lg:block lg:w-1/2 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2">
            {effectType === 'gradient' ? (
              /* Gradient Fade Effect */
              <div className="relative w-full h-[600px]">
                <div 
                  className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-foreground z-10"
                  style={{ background: 'linear-gradient(to left, transparent 0%, transparent 30%, hsl(var(--foreground)) 100%)' }}
                />
                <img 
                  src={profileImage} 
                  alt="Vishwa Kumar" 
                  className="w-full h-full object-cover object-center opacity-40 grayscale"
                />
              </div>
            ) : (
              /* Ghost Effect (Low Opacity) */
              <div className="relative w-full h-[600px] flex items-center justify-center">
                <img 
                  src={profileImage} 
                  alt="Vishwa Kumar" 
                  className="w-[400px] h-[400px] object-cover object-center rounded-full opacity-[0.12] grayscale blur-[1px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
