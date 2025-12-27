import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'ReDroid-AI',
    subtitle: 'Reverse Engineering Assistant',
    period: 'Dec 2025 – Present',
    description: 'AI-powered Linux-based reverse engineering framework for automated static analysis of Android APKs.',
    techStack: ['Python', 'Linux', 'AI/ML'],
    githubUrl: 'https://github.com/vkumxr/ReDroid-AI',
    highlights: [
      'Automated APK extraction and application inspection workflows',
      'Modular architecture for analyzing Android internals and security vulnerabilities',
      'Intelligent analysis pipelines to accelerate vulnerability discovery',
    ],
  },
  {
    title: 'PuBOT',
    subtitle: 'Portable Ultra ROBOT',
    period: 'Aug 2025 – Present',
    description: 'Modular teleoperated robotics system with AI capabilities.',
    techStack: ['Raspberry Pi', 'Python', 'Embedded Linux'],
    githubUrl: 'https://github.com/vkumxr/PuBOT',
    highlights: [
      'Integrated DC motors, ultrasonic sensors, and HDMI display for real-time interaction',
      'Autonomous navigation with conversational AI via voice control',
      'Hardware-software integration achieving reliable performance through iterative testing',
    ],
  },
  {
    title: 'IntelliBank AI',
    subtitle: 'Conversational Banking Assistant',
    period: 'Jun 2025 – Sept 2025',
    description: 'Production-ready Java Spring Boot conversational banking assistant with LLM integration.',
    techStack: ['Java', 'Spring Boot', 'LangChain', 'REST APIs'],
    githubUrl: 'https://github.com/vkumxr/IntelliBank-AI',
    highlights: [
      'RESTful API backend with modular design patterns for scalability',
      'LLM-based conversational logic for intelligent query processing',
      'Context-aware response generation improving user experience',
    ],
  },
  {
    title: 'FruitCutter',
    subtitle: 'The Classic Fruit Ninja Reimagined',
    period: '2024',
    description: 'A nostalgic recreation of the classic Fruit Ninja game built on Scratch with smooth gameplay mechanics.',
    techStack: ['Scratch', 'Game Design', 'Animation'],
    githubUrl: 'https://github.com/vkumxr/FruitCutter---The-Classic-Fruit-Ninja-Reimagined',
    demoUrl: 'https://scratch.mit.edu/projects/1197626235',
    highlights: [
      'Smooth slicing mechanics with realistic fruit physics',
      'Score tracking and combo system for engaging gameplay',
      'Classic arcade-style visuals with polished animations',
    ],
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
  <div className="group card-clean min-w-[340px] max-w-[340px] flex-shrink-0">
    {/* Header */}
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm">{project.subtitle}</p>
      </div>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={`View ${project.title} on GitHub`}
      >
        <Github size={20} />
      </a>
    </div>

    {/* Description */}
    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

    {/* Tech Stack */}
    <div className="flex flex-wrap gap-2 mb-4">
      {project.techStack.map((tech) => (
        <span
          key={tech}
          className="skill-tag text-xs"
        >
          {tech}
        </span>
      ))}
    </div>

    {/* Highlights */}
    <ul className="space-y-2 mb-5">
      {project.highlights.map((highlight, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="w-1 h-1 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
          <span>{highlight}</span>
        </li>
      ))}
    </ul>

    {/* Links */}
    <div className="flex items-center gap-4">
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        View on GitHub
        <ArrowUpRight size={14} />
      </a>
      {'demoUrl' in project && project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Live Demo
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  </div>
);

// Mobile Card Stack Component
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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="relative h-[480px] w-[340px]"
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
              className={`absolute inset-0 transition-all duration-300 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{
                transform: `translateY(${offset * 12}px) scale(${1 - offset * 0.05})`,
                zIndex: projects.length - offset,
              }}
            >
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={goToPrev}
          className="p-2 rounded-full border border-foreground/30 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
          aria-label="Previous project"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-foreground' : 'bg-foreground/30'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={goToNext}
          className="p-2 rounded-full border border-foreground/30 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
          aria-label="Next project"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="text-center text-muted-foreground text-sm mt-4">
        Swipe or use arrows to browse projects
      </p>
    </div>
  );
};

// Desktop Marquee Component
const DesktopMarquee = () => {
  return (
    <div className="overflow-hidden">
      <div className="flex animate-marquee gap-6" style={{ width: 'fit-content' }}>
        {/* First set of cards */}
        {projects.map((project) => (
          <ProjectCard key={`first-${project.title}`} project={project} />
        ))}
        {/* Duplicate set for seamless loop */}
        {projects.map((project) => (
          <ProjectCard key={`second-${project.title}`} project={project} />
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 px-6 section-light overflow-hidden">
      <div ref={ref} className={`container mx-auto max-w-6xl ${isInView ? 'section-bounce' : 'opacity-0'}`}>
        <div className="section-header">
          <p className="section-label">What I've built</p>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className={`transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>
          {isMobile ? <MobileCardStack /> : <DesktopMarquee />}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;