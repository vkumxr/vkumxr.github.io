import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Code2, Terminal, Shield, Cpu, Server, Wrench } from 'lucide-react';
import { staggerContainer, fadeUp, scaleUp } from '../hooks/useMotionAnimations';

const skillCategories = [
  {
    title: 'Programming',
    icon: Code2,
    skills: ['Python', 'JavaScript', 'Bash', 'C/C++', 'Kotlin'],
  },
  {
    title: 'Systems',
    icon: Terminal,
    skills: ['Linux', 'Shell Scripting', 'Git', 'System-level Programming'],
  },
  {
    title: 'Cybersecurity & RE',
    icon: Shield,
    skills: ['Vulnerability Analysis', 'Reverse Engineering', 'CTFs', 'Penetration Testing', 'Android Security'],
  },
  {
    title: 'AI & Automation',
    icon: Cpu,
    skills: ['AI-powered Applications', 'Intelligent Automation', 'Behavior Analysis Systems'],
  },
  {
    title: 'Backend & Tools',
    icon: Server,
    skills: ['REST APIs', 'Automation Tools', 'Developer Utilities', 'Backend Systems'],
  },
  {
    title: 'Embedded',
    icon: Wrench,
    skills: ['Arduino', 'Embedded Systems', 'IoT', 'Tele-operated Robotics'],
  },
];

const SkillsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="skills" className="py-20 md:py-28 px-6 section-light overflow-hidden relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      <motion.div 
        className="container mx-auto max-w-4xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.1, 0.1)}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <p className="section-label">What I work with</p>
          <h2 className="section-title">Skills</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={scaleUp}
              custom={index}
              className="bg-card border border-border rounded-lg p-5 hover:border-foreground/20 transition-colors"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                  <category.icon className="text-foreground" size={16} />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-2.5 py-1 rounded bg-muted text-muted-foreground text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
