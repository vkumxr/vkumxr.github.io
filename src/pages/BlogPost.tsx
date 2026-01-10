import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, ExternalLink, Clock, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ShareButtons from '@/components/ShareButtons';
import { getBlogPostBySlug } from '@/data/blogPosts';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/blog/${post.slug}` 
    : `/blog/${post.slug}`;

  // Estimate reading time (average 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <>
      <Helmet>
        <title>{post.title} | Vishwa Kumar Venkateswaran</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Vishwa Kumar Venkateswaran" />
        <link rel="canonical" href={`/blog/${post.slug}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": post.coverImage,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": "Vishwa Kumar Venkateswaran"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-foreground text-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <article className="container mx-auto px-6 max-w-4xl">
            {/* Breadcrumb */}
            <div className="animate-fade-up mb-6">
              <Breadcrumb 
                items={[
                  { label: 'Blog', href: '/blog' },
                  { label: post.title }
                ]} 
              />
            </div>

            {/* Back Link */}
            <Link 
              to="/blog" 
              className="animate-fade-up-delay-1 inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors mb-10"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            {/* Header */}
            <header className="mb-10">
              <h1 className="animate-fade-up-delay-2 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
                {post.title}
              </h1>
              
              {/* Meta Info */}
              <div className="animate-fade-up-delay-3 flex flex-wrap items-center gap-4 text-sm text-background/60 mb-8">
                <div className="flex items-center gap-2">
                  <User size={14} />
                  <span>Vishwa Kumar Venkateswaran</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-background/30" />
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <div className="w-1 h-1 rounded-full bg-background/30" />
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <div className="animate-fade-up-delay-4">
                <ShareButtons title={post.title} url={currentUrl} />
              </div>
            </header>

            {/* Cover Image */}
            <figure className="animate-scale-in mb-16 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full aspect-video object-cover"
                loading="eager"
              />
            </figure>

            {/* Content */}
            <div className="animate-fade-up-delay-5 blog-content">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-16 mb-6 text-background border-b border-background/20 pb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mt-10 mb-4 text-background">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-background/80 text-lg leading-[1.8] mb-6">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-background font-semibold">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-background/90 italic">
                      {children}
                    </em>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-3 my-6 ml-1">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-background/80 text-lg leading-[1.8] flex gap-3">
                      <span className="text-background/40 select-none mt-1">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  hr: () => (
                    <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-background/30 to-transparent" />
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 pl-6 border-l-4 border-background/50 bg-background/5 py-4 pr-4 rounded-r-lg">
                      <div className="text-background/90 italic text-lg">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="px-2 py-1 bg-background/10 text-background rounded text-base font-mono">
                      {children}
                    </code>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Read on Substack CTA */}
            <div className="mt-20 pt-10 border-t border-background/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-background/50 mb-3 uppercase tracking-wide">
                    Originally published on Substack
                  </p>
                  <a
                    href={post.substackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-background text-foreground font-semibold rounded-full hover:bg-background/90 transition-all duration-300 hover:scale-105"
                  >
                    Read on Substack
                    <ExternalLink size={18} />
                  </a>
                </div>

                <ShareButtons title={post.title} url={currentUrl} />
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
