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
    <section id="skills" className="py-24 md:py-32 px-6 section-light">
      <div ref={ref} className={`container mx-auto max-w-5xl ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header">
          <p className="section-label">What I work with</p>
          <h2 className="section-title">Skills</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`card-clean transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-md bg-foreground/10 flex items-center justify-center">
                  <category.icon className="text-foreground" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
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
