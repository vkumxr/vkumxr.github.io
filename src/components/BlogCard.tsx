import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Estimate reading time
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <article className="group relative bg-background/5 border border-background/10 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-background/10 hover:border-background/20 hover:-translate-y-1">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </Link>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-4 text-background/50 text-sm">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>{readingTime} min read</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold tracking-tight text-background hover:text-background/80 transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-background/60 text-sm leading-relaxed line-clamp-3">
          {post.description}
        </p>
        
        <Link
          to={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-background/80 hover:text-background group/link pt-2"
        >
          Read More
          <ArrowRight 
            size={14} 
            className="transition-transform group-hover/link:translate-x-1" 
          />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
