import { useRef, useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { Code, Terminal, Folder, Award } from 'lucide-react';

const stats = [
  {
    icon: Code,
    value: 10,
    suffix: '+',
    label: 'Years Coding',
    description: 'Programming & Scripting',
  },
  {
    icon: Terminal,
    value: 4,
    suffix: '+',
    label: 'Years Linux',
    description: 'System Administration',
  },
  {
    icon: Folder,
    value: 15,
    suffix: '+',
    label: 'Projects',
    description: 'AI, Security & Robotics',
  },
  {
    icon: Award,
    value: 1,
    suffix: '',
    label: 'Internship',
    description: 'Cybersecurity',
  },
];

const AnimatedCounter = ({ 
  value, 
  suffix, 
  isInView 
}: { 
  value: number; 
  suffix: string; 
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useScrollY();

  return (
    <section ref={sectionRef} className="py-16 md:py-20 px-6 section-light overflow-hidden relative dotted-pattern">
      {/* Decorative elements */}
      <div 
        className="absolute top-10 left-10 w-24 h-24 border border-foreground/5 rounded-full pointer-events-none transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      />
      <div 
        className="absolute bottom-10 right-10 w-32 h-32 border border-foreground/5 rounded-full pointer-events-none transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * -0.02}px)` }}
      />

      <div ref={ref} className={`container mx-auto max-w-5xl relative z-10 ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-lg bg-card border border-border transition-all duration-700 hover:border-foreground/20 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-foreground/5 flex items-center justify-center">
                <stat.icon className="text-foreground" size={24} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* GitHub Contribution Graph */}
        <div className={`transition-all duration-700 delay-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">GitHub Activity</h3>
            <p className="text-sm text-muted-foreground">Contribution graph from the past year</p>
          </div>
          <div className="flex justify-center">
            <a 
              href="https://github.com/vkumxr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border border-border hover:border-foreground/20 transition-colors p-4 bg-card"
            >
              <img 
                src="https://ghchart.rshah.org/vkumxr" 
                alt="vkumxr's GitHub contribution chart"
                className="w-full max-w-2xl h-auto dark:invert dark:hue-rotate-180"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
