import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { Code2, Wrench, Monitor, Shield } from 'lucide-react';
import { staggerContainer, fadeUp, scaleUp, springPresets } from '../hooks/useMotionAnimations';
import { HoverTilt } from './motion/GestureEffects';
import { SkillsDecorations } from './DecorativeShapes';
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

const proficiencySkills = [
  { name: 'Python / Java / C++', level: 85, color: 'bg-foreground' },
  { name: 'Linux Administration', level: 80, color: 'bg-foreground/90' },
  { name: 'Embedded Systems', level: 60, color: 'bg-foreground/80' },
  { name: 'Cybersecurity (Red/Blue)', level: 55, color: 'bg-foreground/70' },
  { name: 'AI/ML Integration', level: 50, color: 'bg-foreground/60' },
];

const AnimatedProgressBar = ({ 
  level, 
  isInView, 
  delay,
  color 
}: { 
  level: number; 
  isInView: boolean; 
  delay: number;
  color: string;
}) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    const timer = setTimeout(() => {
      setWidth(level);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, level, delay]);

  return (
    <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

const SkillsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useScrollY();

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-32 px-6 section-light overflow-hidden relative diagonal-stripes">
      {/* Decorative geometric shapes */}
      <SkillsDecorations />
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

      <motion.div 
        ref={ref} 
        className="container mx-auto max-w-5xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.1, 0.1)}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <p className="section-label">What I work with</p>
          <h2 className="section-title shimmer-text">Skills and Technologies</h2>
        </motion.div>

        {/* Proficiency Progress Bars */}
        <motion.div className="mb-12 max-w-2xl mx-auto" variants={fadeUp}>
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">Proficiency Levels</h3>
          <div className="space-y-4">
            {proficiencySkills.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <AnimatedProgressBar 
                  level={skill.level} 
                  isInView={isInView} 
                  delay={index * 150 + 300}
                  color={skill.color}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skill Categories Grid with 3D Tilt */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={scaleUp}
              custom={index}
            >
              <HoverTilt tiltAmount={8} glare>
                <div className="card-glow corner-accent h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <motion.div 
                      className="w-10 h-10 rounded-md bg-foreground/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={springPresets.bouncy}
                    >
                      <category.icon className="text-foreground" size={20} />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span 
                        key={skill} 
                        className="skill-tag cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </HoverTilt>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
