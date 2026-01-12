import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Calendar, MapPin } from 'lucide-react';
import { staggerContainer, fadeUp, springPresets } from '../hooks/useMotionAnimations';

const experiences = [
  {
    title: 'Offensive Cybersecurity Intern',
    company: 'Inlighnx Global Pvt. Ltd.',
    location: 'Remote',
    period: 'Oct 2025 – Dec 2025',
    responsibilities: [
      'Completed hands-on security labs covering offensive and defensive methodologies',
      'Performed vulnerability analysis and web exploitation exercises',
      'Built Python-based security utilities including authentication testing frameworks',
      'Executed attack simulations in controlled environments under supervision',
    ],
  },
];

const ExperienceSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} id="experience" className="py-20 md:py-28 px-6 section-dark overflow-hidden relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg-light opacity-30" />

      <motion.div 
        className="container mx-auto max-w-3xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.2, 0.1)}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <p className="section-label text-background/50">Where I've worked</p>
          <h2 className="section-title text-background">Experience</h2>
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              variants={fadeUp}
            >
              <motion.div 
                className="bg-background/5 border border-background/10 rounded-lg p-6"
                whileHover={{ borderColor: 'hsl(var(--background) / 0.25)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-background">{exp.title}</h3>
                  <p className="text-background/70 font-medium text-sm">{exp.company}</p>
                  <div className="flex flex-wrap items-center gap-4 text-background/50 text-sm mt-2">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.responsibilities.map((item, i) => (
                    <li 
                      key={i} 
                      className="flex items-start gap-2.5 text-background/70 text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-background/40 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
