import { useInView } from '../hooks/useInView';

const AboutSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-24 md:py-32 px-6 section-dark">
      <div ref={ref} className={`container mx-auto max-w-3xl ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header">
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
    </section>
  );
};

export default AboutSection;
