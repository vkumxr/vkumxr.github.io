import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Github, ExternalLink, Calendar, Lightbulb, Target, Wrench, Trophy, BookOpen } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <main className="relative min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto max-w-4xl px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/#projects" className="inline-flex items-center gap-2 text-foreground hover:underline">
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background">
      <Helmet>
        <title>{project.title} | Vishwa Kumar</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
          {/* Back button */}
          <Link
            to="/#projects"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              setTimeout(() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back to Projects
          </Link>

          {/* Header */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Calendar size={14} />
              {project.period}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{project.title}</h1>
            <p className="text-xl text-muted-foreground">{project.subtitle}</p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span key={tech} className="skill-tag text-sm">
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              <Github size={18} />
              View on GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-foreground/30 text-foreground font-medium hover:bg-foreground/10 transition-colors"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl space-y-16">
          {/* Problem */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <Target className="text-destructive" size={20} />
              </div>
              <h2 className="text-lg font-semibold md:hidden">The Problem</h2>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 hidden md:block">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </div>
          </div>

          {/* Solution */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-green-500" size={20} />
              </div>
              <h2 className="text-lg font-semibold md:hidden">The Solution</h2>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 hidden md:block">The Solution</h2>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Wrench className="text-blue-500" size={20} />
              </div>
              <h2 className="text-lg font-semibold md:hidden">Key Features</h2>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 hidden md:block">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Challenges */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <Target className="text-orange-500" size={20} />
              </div>
              <h2 className="text-lg font-semibold md:hidden">Challenges</h2>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 hidden md:block">Challenges</h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500/40 mt-2 flex-shrink-0" />
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Outcome */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="text-purple-500" size={20} />
              </div>
              <h2 className="text-lg font-semibold md:hidden">Outcome</h2>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 hidden md:block">Outcome</h2>
              <p className="text-muted-foreground leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Learnings */}
          <div className="grid md:grid-cols-[200px_1fr] gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-cyan-500" size={20} />
              </div>
              <h2 className="text-lg font-semibold md:hidden">What I Learned</h2>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 hidden md:block">What I Learned</h2>
              <ul className="space-y-3">
                {project.learnings.map((learning, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 mt-2 flex-shrink-0" />
                    <span>{learning}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Interested in this project?</h2>
          <p className="text-muted-foreground mb-8">Check out the source code or get in touch to learn more.</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
            >
              <Github size={18} />
              View Source
            </a>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-foreground/30 text-foreground font-medium hover:bg-foreground/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectDetail;
