import { useInView } from '../hooks/useInView';
import { ArrowUpRight, Github } from 'lucide-react';

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
];

const ProjectsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="projects" className="py-24 md:py-32 px-6 bg-[hsl(0,0%,8%)] text-[hsl(0,0%,98%)]">
      <div ref={ref} className="container mx-auto max-w-5xl">
        <div className={`section-header transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-background/50 text-sm tracking-widest uppercase mb-4">What I've built</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-background">Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group bg-background/5 border border-background/10 rounded-lg p-6 transition-all duration-500 hover:border-background/25 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-background group-hover:text-background transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-background/60 text-sm">{project.subtitle}</p>
                </div>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/40 hover:text-background transition-colors"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={20} />
                </a>
              </div>

              {/* Description */}
              <p className="text-background/70 text-sm mb-4">{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded bg-background/10 text-background/70 border border-background/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <ul className="space-y-2 mb-5">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-background/60">
                    <span className="w-1 h-1 rounded-full bg-background/40 mt-2 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* GitHub Link */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-background/70 hover:text-background transition-colors"
              >
                View on GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
