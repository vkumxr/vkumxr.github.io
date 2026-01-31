import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { Calendar, MapPin } from 'lucide-react';
import { staggerContainer, fadeUp, springPresets } from '../hooks/useMotionAnimations';
import { Parallax, ScaleOnScroll } from './motion/ScrollAnimations';
import { ExperienceDecorations } from './DecorativeShapes';
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
    <section ref={sectionRef} id="experience" className="py-24 md:py-32 px-6 section-dark overflow-hidden relative grid-bg-light">
      {/* Decorative geometric shapes */}
      <ExperienceDecorations />
      
      {/* Faded background terminal elements with parallax */}
      <Parallax offset={40} className="absolute top-1/4 right-10 hidden lg:block">
        <div className="text-background/[0.04] font-mono text-sm leading-relaxed select-none pointer-events-none">
          <div>$ sudo systemctl start</div>
          <div>$ npm run deploy</div>
          <div>$ git push origin main</div>
        </div>
      </Parallax>
      <Parallax offset={-30} className="absolute bottom-1/4 left-10 hidden lg:block">
        <div className="text-background/[0.04] font-mono text-sm leading-relaxed select-none pointer-events-none">
          <div>$ docker-compose up</div>
          <div>$ kubectl apply -f</div>
          <div>$ ssh user@server</div>
        </div>
      </Parallax>

      {/* Gradient accents with parallax */}
      <Parallax offset={30}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-background/5 to-transparent pointer-events-none rounded-full blur-3xl" />
      </Parallax>
      <Parallax offset={-30}>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-background/5 to-transparent pointer-events-none rounded-full blur-3xl" />
      </Parallax>

      <motion.div 
        ref={ref} 
        className="container mx-auto max-w-3xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.2, 0.1)}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <p className="section-label text-background/60">Where I've worked</p>
          <h2 className="section-title shimmer-text-light">Experience</h2>
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
                className="absolute left-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-background/50 to-background/10"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformOrigin: 'top' }}
              />
              <motion.div 
                className="timeline-dot-pulse"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...springPresets.bouncy, delay: 0.2 }}
              />
              
              <ScaleOnScroll>
                <motion.div 
                  className="bg-background/5 border border-background/10 rounded-lg p-6 ml-4 backdrop-blur-sm"
                  whileHover={{ 
                    borderColor: 'hsl(var(--background) / 0.3)',
                    backgroundColor: 'hsl(var(--background) / 0.1)',
                    y: -4,
                  }}
                  transition={springPresets.smooth}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-background">{exp.title}</h3>
                    <p className="text-background/80 font-medium">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-background/60 text-sm mt-2">
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
                        className="flex items-start gap-3 text-background/70"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1, ...springPresets.gentle }}
                      >
                        <motion.span 
                          className="w-1.5 h-1.5 rounded-full bg-background/40 mt-2 flex-shrink-0"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.1, ...springPresets.bouncy }}
                        />
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
