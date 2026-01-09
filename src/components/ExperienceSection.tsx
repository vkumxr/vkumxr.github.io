import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { Calendar, MapPin } from 'lucide-react';
import { staggerContainer, fadeUp, springPresets } from '../hooks/useMotionAnimations';
import { Parallax, ScaleOnScroll } from './motion/ScrollAnimations';

const experiences = [
  {
    title: 'Offensive Cyber Security Intern',
    company: 'InLighnX Global Pvt. Ltd.',
    location: 'Remote',
    period: 'Oct 2025 – Dec 2025',
    responsibilities: [
      'Completed structured training in offensive and defensive security methodologies',
      'Built Python-based security utilities including PDF protection tools and authentication testing frameworks',
      'Applied hashing algorithms (MD5, SHA), network protocols, and password cracking techniques in controlled labs',
      'Performed vulnerability assessments and penetration testing exercises under supervision',
    ],
  },
];

const ExperienceSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useScrollY();

  return (
    <section ref={sectionRef} id="experience" className="py-24 md:py-32 px-6 overflow-hidden relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background pointer-events-none" />

      <motion.div 
        ref={ref} 
        className="container mx-auto max-w-3xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.2, 0.1)}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <p className="section-label">Where I've worked</p>
          <h2 className="section-title shimmer-text">Experience</h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative pl-8"
              variants={fadeUp}
            >
              {/* Timeline */}
              <motion.div 
                className="absolute left-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-foreground/50 to-foreground/10"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformOrigin: 'top' }}
              />
              <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-foreground/20 border-2 border-foreground/60" />
              
              <ScaleOnScroll>
                <motion.div 
                  className="glass-card p-6 ml-4"
                  whileHover={{ 
                    borderColor: 'hsl(var(--foreground) / 0.3)',
                    y: -4,
                  }}
                  transition={springPresets.smooth}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-foreground/80 font-medium">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mt-2">
                      <motion.div 
                        className="flex items-center gap-1.5"
                        whileHover={{ x: 3 }}
                      >
                        <Calendar size={14} />
                        <span>{exp.period}</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-1.5"
                        whileHover={{ x: 3 }}
                      >
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </motion.div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.responsibilities.map((item, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3 text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1, ...springPresets.gentle }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </ScaleOnScroll>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
