import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <motion.div
    className="card-clean h-full"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4 }}
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      {project.status && (
        <span className="text-xs text-accent font-medium">{project.status}</span>
      )}
    </div>

    <p className="text-sm text-muted-foreground mb-2">
      <span className="font-medium text-foreground">Problem:</span> {project.problem}
    </p>
    <p className="text-sm text-muted-foreground mb-4">
      <span className="font-medium text-foreground">Solution:</span> {project.solution}
    </p>

    <div className="flex flex-wrap gap-1.5 mb-4">
      {project.techStack.map((tech) => (
        <span key={tech} className="skill-tag">{tech}</span>
      ))}
    </div>

    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
      whileHover={{ x: 2 }}
    >
      <Github size={16} />
      View on GitHub
    </motion.a>
  </motion.div>
);

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="section-header">
          <p className="section-label">Work</p>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
