import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';

const experiences = [
  {
    title: 'Offensive Cyber Security Intern',
    company: 'InLighnX Global Pvt. Ltd.',
    location: 'Remote',
    period: 'Oct 2025 – Dec 2025',
    description: 'Completed structured training in offensive and defensive security methodologies.',
    highlights: [
      'Built Python-based security utilities including PDF protection tools and authentication testing frameworks',
      'Applied hashing algorithms (MD5, SHA), network protocols, and password cracking techniques in controlled labs',
      'Performed vulnerability assessments and penetration testing exercises under supervision',
    ],
  },
];

const certifications = [
  { name: 'Google Cybersecurity Certificate', issuer: 'Google', year: '2024' },
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon', year: '2024' },
  { name: 'Linux Fundamentals', issuer: 'Linux Foundation', year: '2023' },
];

const ExperienceSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="experience" className="py-24 md:py-32 px-6 section-cyber relative">
      <div className="absolute inset-0 grid-cyber opacity-30" />
      
      <motion.div 
        ref={ref} 
        className="container mx-auto max-w-4xl relative z-10"
      >
        {/* Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">// operation history</p>
          <h2 className="section-title cyber-glow">EXPERIENCE LOG</h2>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-6 mb-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className="glass-panel-glow p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="font-mono text-lg text-primary mb-1">{exp.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building size={14} />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs text-muted-foreground mt-2 md:mt-0">
                  <Calendar size={14} />
                  {exp.period}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight size={14} className="text-primary mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest text-center">
            VERIFIED_CREDENTIALS:
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                className="glass-panel p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="font-mono text-sm text-primary mb-1">{cert.name}</div>
                <div className="text-xs text-muted-foreground">
                  {cert.issuer} • {cert.year}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
