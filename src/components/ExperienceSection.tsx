import { useInView } from '../hooks/useInView';
import { Building2, Calendar, MapPin } from 'lucide-react';
import NetworkBackground from './NetworkBackground';

const experiences = [
  {
    title: 'Offensive Cyber Security Intern',
    company: 'InLighnX Global Pvt. Ltd.',
    location: 'Remote',
    period: 'Oct 2025 – Dec 2025',
    responsibilities: [
      'Offensive & defensive security methodologies',
      'Python-based security utilities (PDF protection, auth testing)',
      'Hashing algorithms (MD5, SHA), network protocols',
      'Vulnerability assessment & penetration testing exercises',
    ],
  },
];

const ExperienceSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="experience" className="py-28 px-6 bg-background text-foreground relative overflow-hidden">
      <NetworkBackground variant="light" />
      <div ref={ref} className="container mx-auto max-w-4xl relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">
            Where I've worked
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Experience</h2>
          <div className="w-16 h-px bg-foreground/30 mx-auto" />
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150 + 100}ms` }}
            >
              {/* Timeline line */}
              <div className="absolute left-6 top-14 bottom-0 w-px bg-gradient-to-b from-foreground/30 to-transparent" />
              
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 w-5 h-5 rounded-full bg-foreground border-4 border-background z-10" />
              
              <div className="ml-16 bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300">
                <div className="flex flex-wrap items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                    <Building2 className="text-foreground" size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                    <p className="text-foreground/80 font-medium text-lg">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mt-2">
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
                </div>

                <ul className="space-y-3">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
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
