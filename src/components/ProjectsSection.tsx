import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { staggerContainer, fadeUp } from '../hooks/useMotionAnimations';

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-card border border-border rounded-lg p-6 hover:border-foreground/20 transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label={`View ${project.title} on GitHub`}
          >
            <Github size={16} />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-4">
        {project.highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-1 h-1 rounded-full bg-foreground/30 mt-2 flex-shrink-0" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Case Study Link */}
      <Link
        to={`/projects/${project.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
      >
        Read case study
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section ref={ref} id="projects" className="py-20 md:py-28 px-6 section-light overflow-hidden relative">
      {/* Subtle pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      <motion.div
        className="container mx-auto max-w-4xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer(0.15, 0.1)}
      >
        <motion.div className="section-header" variants={fadeUp}>
          <p className="section-label">What I've built</p>
          <h2 className="section-title">Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-1 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div 
          className="text-center mt-10"
          variants={fadeUp}
        >
          <a
            href="https://github.com/vkumxr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={16} />
            View all projects on GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
