import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ExternalLink, Github, FileSearch, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <motion.div
    className="glass-panel-glow p-6 min-w-[340px] max-w-[340px] flex-shrink-0"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    {/* Classification header */}
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-primary" />
        <span className="font-mono text-xs text-primary uppercase tracking-wider">
          Security Analysis
        </span>
      </div>
      <span className="font-mono text-xs text-muted-foreground">
        #{String(index + 1).padStart(3, '0')}
      </span>
    </div>

    {/* Project name */}
    <h3 className="font-mono text-lg text-primary mb-1 glitch-hover">
      {project.title}
    </h3>
    <p className="font-mono text-xs text-muted-foreground mb-4">
      {project.subtitle}
    </p>

    {/* Description */}
    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
      {project.description}
    </p>

    {/* Tech stack */}
    <div className="flex flex-wrap gap-2 mb-4">
      {project.techStack.slice(0, 4).map((tech) => (
        <span key={tech} className="cyber-tag text-xs">
          {tech}
        </span>
      ))}
    </div>

    {/* Highlights */}
    <div className="space-y-2 mb-6">
      {project.highlights.slice(0, 2).map((highlight, i) => (
        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
          <span className="text-primary">▸</span>
          <span>{highlight}</span>
        </div>
      ))}
    </div>

    {/* Actions */}
    <div className="flex items-center gap-4 pt-4 border-t border-border">
      <Link
        to={`/projects/${project.slug}`}
        className="flex items-center gap-2 font-mono text-xs text-primary hover:text-primary/80 transition-colors"
      >
        <FileSearch size={14} />
        VIEW ANALYSIS
      </Link>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <Github size={14} />
        SOURCE
      </a>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink size={14} />
          DEMO
        </a>
      )}
    </div>
  </motion.div>
);

// Mobile Card Stack
const MobileCardStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
    if (distance < -minSwipeDistance) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="relative h-[500px] w-[340px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {projects.map((project, index) => {
          const offset = (index - currentIndex + projects.length) % projects.length;
          const isVisible = offset < 3;
          
          return (
            <div
              key={project.title}
              className={`absolute inset-0 transition-all duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.05})`,
                zIndex: projects.length - offset,
              }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)}
          className="p-2 rounded-sm border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % projects.length)}
          className="p-2 rounded-sm border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <p className="font-mono text-xs text-muted-foreground mt-4">
        SWIPE TO BROWSE MISSION FILES
      </p>
    </div>
  );
};

// Desktop Marquee
const DesktopMarquee = () => (
  <div className="overflow-hidden">
    <div className="flex animate-marquee gap-6" style={{ width: 'fit-content' }}>
      {projects.map((project, index) => (
        <ProjectCard key={`first-${project.title}`} project={project} index={index} />
      ))}
      {projects.map((project, index) => (
        <ProjectCard key={`second-${project.title}`} project={project} index={index} />
      ))}
    </div>
  </div>
);

const ProjectsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 section-cyber section-brackets relative overflow-hidden">
      <div className="absolute inset-0 grid-animated opacity-20" />
      
      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">// mission files</p>
          <h2 className="section-title">SECURITY ANALYSES</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {isMobile ? <MobileCardStack /> : <DesktopMarquee />}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
