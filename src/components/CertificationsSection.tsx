import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { useScrollY } from '../hooks/useParallax';
import { Award, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'BASH Training',
    issuer: 'Spoken Tutorial, IIT Bombay',
    date: 'Oct 2025',
    credentialUrl: 'https://www.linkedin.com/in/vishwakumarv/',
  },
  {
    title: 'Android Bug Bounty Hunting',
    issuer: 'EC Council',
    date: 'Sep 2025',
    credentialUrl: 'https://www.linkedin.com/in/vishwakumarv/',
  },
  {
    title: 'Cybersecurity Assessment',
    issuer: 'LearnTube',
    date: 'Jun 2025',
    credentialUrl: 'https://www.linkedin.com/in/vishwakumarv/',
  },
  {
    title: 'Arduino Test',
    issuer: 'IIT Bombay',
    date: 'May 2024',
    credentialUrl: 'https://www.linkedin.com/in/vishwakumarv/',
  },
  {
    title: 'Kotlin Assessment',
    issuer: 'LearnTube',
    date: '2024',
    credentialUrl: 'https://www.linkedin.com/in/vishwakumarv/',
  },
];

const CertificationsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const sectionRef = useRef<HTMLElement>(null);
  const scrollY = useScrollY();

  return (
    <section ref={sectionRef} id="certifications" className="py-20 md:py-24 px-6 section-light overflow-hidden relative radial-glow">
      {/* Decorative elements - geometric shapes */}
      <div 
        className="absolute top-20 right-10 w-20 h-20 border-2 border-foreground/10 rounded-lg rotate-12 pointer-events-none transition-transform duration-100"
        style={{ transform: `rotate(12deg) translateY(${scrollY * 0.03}px)` }}
      />
      <div 
        className="absolute top-40 right-32 w-8 h-8 border-2 border-foreground/10 rounded-full pointer-events-none transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      />
      <div 
        className="absolute bottom-20 left-10 w-16 h-16 border-2 border-foreground/10 rotate-45 pointer-events-none transition-transform duration-100"
        style={{ transform: `rotate(45deg) translateY(${scrollY * -0.02}px)` }}
      />
      <div 
        className="absolute bottom-32 left-32 w-6 h-6 bg-foreground/5 rounded-full pointer-events-none transition-transform duration-100"
        style={{ transform: `translateY(${scrollY * -0.03}px)` }}
      />

      <div ref={ref} className={`container mx-auto max-w-4xl relative z-10 ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header">
          <p className="section-label">Credentials</p>
          <h2 className="section-title shimmer-text">Certifications</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <a
              key={cert.title}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-5 rounded-lg bg-card border border-border hover:border-foreground/20 transition-all duration-500 hover:shadow-lg ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-foreground/5 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground/10 transition-colors">
                  <Award className="text-foreground" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground text-sm truncate">{cert.title}</h3>
                    <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground/70">{cert.date}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
