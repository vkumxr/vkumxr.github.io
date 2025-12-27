import { useInView } from '../hooks/useInView';
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

  return (
    <section id="experience" className="py-24 md:py-32 px-6 section-light">
      <div ref={ref} className="container mx-auto max-w-3xl">
        <div className={`section-header transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="section-label">Where I've worked</p>
          <h2 className="section-title">Experience</h2>
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
              <div className="timeline-line" />
              <div className="timeline-dot" />
              
              <div className="card-clean ml-4">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-foreground/80 font-medium">{exp.company}</p>
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

                <ul className="space-y-2">
                  {exp.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
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
