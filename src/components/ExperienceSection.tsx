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
    <section id="experience" className="py-24 md:py-32 px-6 section-dark">
      <div ref={ref} className={`container mx-auto max-w-3xl ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header">
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
              <div className="absolute left-[7px] top-4 bottom-0 w-px bg-background/30" />
              <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full bg-background border-4 border-foreground" />
              
              <div className="bg-background/5 border border-background/10 rounded-lg p-6 transition-all duration-300 hover:border-background/20 ml-4">
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
