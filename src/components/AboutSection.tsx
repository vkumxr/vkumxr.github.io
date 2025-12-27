import { useInView } from '../hooks/useInView';
import NetworkBackground from './NetworkBackground';

const AboutSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-28 px-6 bg-background text-foreground relative overflow-hidden">
      <NetworkBackground variant="light" />
      <div
        ref={ref}
        className="container mx-auto max-w-3xl relative z-10"
      >
        <div className={`text-center mb-14 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            Get to know me
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Me</h2>
          <div className="w-16 h-px bg-foreground/30 mx-auto" />
        </div>

        <div className="space-y-8">
          <p 
            className={`text-xl md:text-2xl leading-relaxed text-muted-foreground text-center transition-all duration-700 delay-100 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Engineering student specializing in{' '}
            <span className="text-foreground font-semibold">AI-driven systems</span>,{' '}
            <span className="text-foreground font-semibold">cybersecurity</span>, and{' '}
            <span className="text-foreground font-semibold">scalable backend development</span>.
          </p>
          
          <p 
            className={`text-lg leading-relaxed text-muted-foreground text-center transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Proven experience building production-ready applications integrating
            LLMs, REST APIs, and automation workflows.
          </p>
          
          <p 
            className={`text-lg leading-relaxed text-muted-foreground text-center transition-all duration-700 delay-300 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Passionate about system-level understanding, Linux internals, security analysis, 
            and creating intelligent software that solves real-world problems at scale.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
