import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { Calendar, MapPin } from 'lucide-react';

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
      {/* Faded background terminal elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div 
          className="absolute top-1/4 right-10 text-background/[0.04] font-mono text-sm leading-relaxed select-none transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * 0.04}px)` }}
        >
          <div>$ sudo systemctl start</div>
          <div>$ npm run deploy</div>
          <div>$ git push origin main</div>
        </div>
        <div 
          className="absolute bottom-1/4 left-10 text-background/[0.04] font-mono text-sm leading-relaxed select-none transition-transform duration-100"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        >
          <div>$ docker-compose up</div>
          <div>$ kubectl apply -f</div>
          <div>$ ssh user@server</div>
        </div>
      </div>

      {/* Gradient accents with parallax */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-background/5 to-transparent pointer-events-none rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translate(${scrollY * 0.03}px, ${scrollY * -0.02}px)` }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-background/5 to-transparent pointer-events-none rounded-full blur-3xl transition-transform duration-100"
        style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.02}px)` }}
      />

      <div ref={ref} className={`container mx-auto max-w-3xl relative z-10 ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header">
          <p className="section-label text-background/60">Where I've worked</p>
          <h2 className="section-title shimmer-text-light">Experience</h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative pl-8 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150 + 100}ms` }}
            >
              {/* Timeline */}
              <div className="absolute left-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-background/50 to-background/10" />
              <div className="timeline-dot-pulse" />
              
              <div className="bg-background/5 border border-background/10 rounded-lg p-6 transition-all duration-300 hover:border-background/30 hover:bg-background/10 ml-4 backdrop-blur-sm">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-background">{exp.title}</h3>
                  <p className="text-background/80 font-medium">{exp.company}</p>
                  <div className="flex flex-wrap items-center gap-4 text-background/60 text-sm mt-2">
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
                    <li key={i} className="flex items-start gap-3 text-background/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-background/40 mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
