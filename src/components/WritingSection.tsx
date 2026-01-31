import { ArrowUpRight, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface WritingItem {
  id: string;
  title: string;
  description: string;
  date: string;
  externalUrl: string;
  platform: string;
}

const writings: WritingItem[] = [
  {
    id: "1",
    title: "When Time Breaks Software: From Y2K to Today's Hidden Bugs",
    description: "A tiny shortcut that almost broke the world. How two missing digits nearly caused global chaos.",
    date: "Dec 26, 2025",
    externalUrl: "https://vkumxr.substack.com/p/when-time-breaks-software-from-y2k",
    platform: "Substack",
  },
];

const WritingSection = () => {
  return (
    <section id="writing" className="section-light py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Writing
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Thoughts on security, systems, and the quirks of software engineering.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {writings.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative block p-6 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                  <ExternalLink size={10} />
                  {item.platform}
                </span>
                <ArrowUpRight 
                  size={18} 
                  className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" 
                />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={12} />
                <time dateTime={item.date}>{item.date}</time>
              </div>
            </motion.a>
          ))}
        </div>

        {writings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WritingSection;
