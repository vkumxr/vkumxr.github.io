import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { Code2, Wrench, Monitor, Shield } from 'lucide-react';

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: ['Java', 'C', 'C++', 'Python', 'MATLAB', 'JavaScript', 'HTML', 'Kotlin', 'BASH'],
  },
  {
    title: 'Frameworks & Tools',
    icon: Wrench,
    skills: ['Spring Boot', 'REST APIs', 'LangChain', 'n8n', 'Git', 'Linux', 'IntelliJ IDEA', 'VS Code'],
  },
  {
    title: 'Platforms & Systems',
    icon: Monitor,
    skills: ['Linux (Primary OS)', 'Windows', 'macOS', 'UTM', 'VirtualBox', 'QEMU', 'Raspberry Pi', 'Arduino'],
  },
  {
    title: 'Security & Tooling',
    icon: Shield,
    skills: ['Nmap', 'Burp Suite', 'Metasploit', 'Android Debugging', 'Penetration Testing', 'CTF Platforms'],
  },
];

const SkillsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useScrollY();

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-32 px-6 section-light overflow-hidden relative grid-bg">
      {/* Faded background code elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div 
          className="absolute top-20 right-0 text-foreground/[0.03] font-mono text-[200px] leading-none select-none transition-transform duration-100"
          style={{ transform: `rotate(-15deg) translateY(${scrollY * 0.05}px)` }}
        >
          {'</>'}
        </div>
        <div 
          className="absolute bottom-10 left-0 text-foreground/[0.03] font-mono text-[150px] leading-none select-none transition-transform duration-100"
          style={{ transform: `rotate(10deg) translateY(${scrollY * -0.03}px)` }}
        >
          {'{ }'}
        </div>
      </div>

      {/* Corner gradient accent with parallax */}
      <div 
        className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-foreground/5 to-transparent pointer-events-none transition-transform duration-100"
        style={{ transform: `translate(${scrollY * -0.02}px, ${scrollY * 0.02}px)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-foreground/5 to-transparent pointer-events-none transition-transform duration-100"
        style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.02}px)` }}
      />

      <div ref={ref} className={`container mx-auto max-w-5xl relative z-10 ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header">
          <p className="section-label">What I work with</p>
          <h2 className="section-title shimmer-text">Skills</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`card-glow corner-accent transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-md bg-foreground/10 flex items-center justify-center transition-all duration-300 group-hover:bg-foreground/20">
                  <category.icon className="text-foreground" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
