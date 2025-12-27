import { useInView } from '../hooks/useInView';
import { ArrowUpRight, Bot, Cpu, MessageSquare, Github } from 'lucide-react';
import NetworkBackground from './NetworkBackground';

const projects = [
  {
    title: 'ReDroid-AI',
    subtitle: 'Reverse Engineering Assistant',
    period: 'Dec 2025 – Present',
    icon: Bot,
    description: 'AI-powered Linux-based reverse engineering framework for Android applications.',
    githubUrl: 'https://github.com/vkumxr/ReDroid-AI',
    highlights: [
      'Automated static analysis of Android APKs',
      'Python CLI tools for APK extraction & inspection',
      'Modular architecture & intelligent analysis pipelines',
    ],
  },
  {
    title: 'PuBOT',
    subtitle: 'Portable Ultra ROBOT',
    period: 'Aug 2025 – Present',
    icon: Cpu,
    description: 'Modular AI-enabled robotics system using Raspberry Pi.',
    githubUrl: 'https://github.com/vkumxr/PuBOT',
    highlights: [
      'Autonomous navigation + conversational AI',
      'Embedded Linux motor & sensor control',
      'Hardware–software integration & optimization',
    ],
  },
  {
    title: 'IntelliBank AI',
    subtitle: 'Conversational Banking Assistant',
    period: 'Jun 2025 – Sept 2025',
    icon: MessageSquare,
    description: 'Java Spring Boot conversational banking system with AI capabilities.',
    githubUrl: 'https://github.com/vkumxr/IntelliBank-AI',
    highlights: [
      'RESTful backend with scalable architecture',
      'LLM integration via LangChain',
      'Context-aware conversation management',
    ],
  },
];

const ProjectsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="projects" className="py-28 px-6 bg-foreground text-background relative overflow-hidden">
      <NetworkBackground variant="dark" />
      <div ref={ref} className="container mx-auto max-w-6xl relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-background/50 text-sm tracking-widest uppercase mb-4">
            What I've built
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Featured Projects</h2>
          <div className="w-16 h-px bg-background/30 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-background/5 border border-background/10 rounded-2xl p-8 block transition-all duration-700 hover:bg-background/10 hover:border-background/20 hover:-translate-y-2 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100 + 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center group-hover:bg-background/20 transition-colors">
                  <project.icon className="text-background" size={22} />
                </div>
                <div className="flex items-center gap-2">
                  <Github className="text-background/40 group-hover:text-background/60 transition-colors" size={18} />
                  <ArrowUpRight
                    className="text-background/40 group-hover:text-background group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    size={18}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-1 group-hover:text-background transition-colors">{project.title}</h3>
              <p className="text-background/60 text-sm font-medium mb-1">{project.subtitle}</p>
              <p className="text-background/40 text-xs mb-5 font-mono">{project.period}</p>

              {/* Description */}
              <p className="text-background/70 text-sm leading-relaxed mb-6">{project.description}</p>

              {/* Highlights */}
              <ul className="space-y-2">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-background/50">
                    <span className="w-1 h-1 rounded-full bg-background/40 mt-2 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
