import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Github } from 'lucide-react';
import { getProjectBySlug } from '../data/projects';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/#projects" className="inline-flex items-center gap-2 text-foreground hover:text-accent">
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{project.title} | Vishwa Kumar</title>
        <meta name="description" content={project.solution} />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
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

          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          
          {project.status && (
            <p className="text-accent font-medium mb-4">{project.status}</p>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech) => (
              <span key={tech} className="skill-tag">{tech}</span>
            ))}
          </div>

          <div className="space-y-8 mb-12">
            <div>
              <h2 className="text-lg font-semibold mb-2">Problem</h2>
              <p className="text-muted-foreground">{project.problem}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Solution</h2>
              <p className="text-muted-foreground">{project.solution}</p>
            </div>
          </div>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectDetail;
