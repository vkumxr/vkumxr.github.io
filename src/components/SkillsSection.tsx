import { useInView } from '../hooks/useInView';
import { Code2, Wrench, Monitor, Shield } from 'lucide-react';
import NetworkBackground from './NetworkBackground';

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
    skills: [
      'Linux (Primary OS)',
      'Windows',
      'macOS',
      'UTM',
      'VirtualBox',
      'QEMU',
      'Raspberry Pi',
      'Arduino',
    ],
  },
  {
    title: 'Security & Tooling',
    icon: Shield,
    skills: [
      'Nmap',
      'Burp Suite',
      'Metasploit',
      'Android Debugging',
      'Penetration Testing',
      'CTF Platforms',
    ],
  },
];

const SkillsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="skills" className="py-28 px-6 bg-foreground text-background relative overflow-hidden">
      <NetworkBackground variant="dark" />
      <div ref={ref} className="container mx-auto max-w-5xl relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-background/50 text-sm tracking-widest uppercase mb-4">
            What I work with
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Technical Skills</h2>
          <div className="w-16 h-px bg-background/30 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`group bg-background/5 border border-background/10 rounded-2xl p-8 transition-all duration-700 hover:bg-background/10 hover:border-background/20 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-background/20 transition-colors">
                  <category.icon className="text-background" size={22} />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 rounded-full bg-background/10 text-background/80 text-sm font-medium border border-background/10 hover:border-background/30 hover:bg-background/20 transition-all duration-200"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
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
