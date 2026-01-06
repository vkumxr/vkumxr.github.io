import { motion } from 'framer-motion';

const skills = {
  languages: ['Python', 'Java'],
  tools: ['Git', 'Linux', 'VS Code', 'Spring Boot', 'OpenCV', 'Raspberry Pi'],
  areas: ['Reverse Engineering', 'Automation', 'AI-assisted Tooling'],
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 md:py-28 px-6 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="section-header">
          <p className="section-label">Stack</p>
          <h2 className="section-title">Skills</h2>
        </div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Languages</h3>
            <p className="text-foreground">{skills.languages.join(', ')}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Tools</h3>
            <p className="text-foreground">{skills.tools.join(', ')}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Areas</h3>
            <p className="text-foreground">{skills.areas.join(', ')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
