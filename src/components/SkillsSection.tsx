import { useInView } from '../hooks/useInView';
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

  return (
    <section id="skills" className="py-24 md:py-32 px-6 bg-[hsl(0,0%,8%)] text-[hsl(0,0%,98%)]">
      <div ref={ref} className="container mx-auto max-w-5xl">
        <div className={`section-header transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-background/50 text-sm tracking-widest uppercase mb-4">What I work with</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-background">Skills</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`bg-background/5 border border-background/10 rounded-lg p-6 transition-all duration-700 hover:border-background/20 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-md bg-background/10 flex items-center justify-center">
                  <category.icon className="text-background" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-background">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag-inverted">
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
