import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-background/50">
        <li className="flex items-center gap-2">
          <Link 
            to="/" 
            className="hover:text-background transition-colors flex items-center gap-1.5"
          >
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight size={14} className="text-background/30" />
            {item.href ? (
              <Link 
                to={item.href} 
                className="hover:text-background transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-background font-medium truncate max-w-[200px] md:max-w-[400px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
