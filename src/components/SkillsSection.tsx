import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Bug, Code, Terminal, Network, Shield, Database } from 'lucide-react';

const skillModules = [
  { icon: Bug, name: 'Web Exploitation', level: 85 },
  { icon: Code, name: 'Reverse Engineering', level: 75 },
  { icon: Terminal, name: 'Linux', level: 90 },
  { icon: Shield, name: 'Python', level: 85 },
  { icon: Database, name: 'C/C++', level: 70 },
  { icon: Network, name: 'Networking', level: 80 },
];

const additionalSkills = [
  { category: 'Languages', skills: ['Java', 'Python', 'C', 'C++', 'BASH', 'JavaScript', 'Kotlin'] },
  { category: 'Tools', skills: ['Nmap', 'Burp Suite', 'Metasploit', 'Wireshark', 'IDA Pro', 'Ghidra'] },
  { category: 'Platforms', skills: ['Linux', 'Docker', 'Raspberry Pi', 'Arduino', 'AWS'] },
  { category: 'Frameworks', skills: ['Spring Boot', 'LangChain', 'REST APIs', 'n8n'] },
];

const SkillModule = ({ skill, index }: { skill: typeof skillModules[0]; index: number }) => {
  const Icon = skill.icon;
  
  return (
    <motion.div
      className="glass-panel-glow p-4 group cursor-default"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-mono text-sm text-primary">▸ {skill.name}</h3>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          style={{ boxShadow: '0 0 10px hsl(142 70% 45% / 0.5)' }}
        />
      </div>
      <div className="mt-1 text-right font-mono text-xs text-muted-foreground">
        {skill.level}%
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="skills" className="py-24 md:py-32 px-6 section-cyber section-brackets relative">
      <div className="absolute inset-0 grid-animated opacity-20" />
      
      <motion.div 
        ref={ref} 
        className="container mx-auto max-w-5xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">// capability modules</p>
          <h2 className="section-title">SKILL MATRIX</h2>
        </motion.div>

        {/* Main skill modules */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {skillModules.map((skill, index) => (
            <SkillModule key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Additional skills by category */}
        <motion.div 
          className="glass-panel p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">
            ADDITIONAL_CAPABILITIES:
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {additionalSkills.map((category, catIndex) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="font-mono text-xs text-primary mb-2">
                  [{category.category.toUpperCase()}]
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="cyber-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
