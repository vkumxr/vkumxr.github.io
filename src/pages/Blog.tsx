import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { blogPosts } from '@/data/blogPosts';

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Vishwa Kumar</title>
        <meta 
          name="description" 
          content="Thoughts, ideas, and updates from my learning journey. Read articles about software engineering, technology, and development insights." 
        />
        <meta property="og:title" content="Blog | Vishwa Kumar" />
        <meta property="og:description" content="Thoughts, ideas, and updates from my learning journey." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/blog" />
      </Helmet>

      <div className="min-h-screen bg-foreground text-background">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-6">
            {/* Back to Home */}
            <Link 
              to="/" 
              className="animate-fade-up inline-flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors mb-10"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            {/* Header */}
            <header className="mb-20 max-w-3xl">
              <h1 className="animate-fade-up-delay-1 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
                Blog
              </h1>
              <p className="animate-fade-up-delay-2 text-xl text-background/60 leading-relaxed">
                Thoughts, ideas, and updates from my learning journey.
              </p>
            </header>

            {/* Blog Grid */}
            <section aria-label="Blog posts">
              {blogPosts.length > 0 ? (
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 stagger-children">
                  {blogPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-background/60 text-lg">No blog posts yet. Check back soon!</p>
                </div>
              )}
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
