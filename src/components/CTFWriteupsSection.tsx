import { ArrowUpRight, Shield, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ctfWriteups } from '@/data/ctfWriteups';

const CTFWriteupsSection = () => {
  return (
    <section id="ctf-writeups" className="section-dark py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            CTF Writeups
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Detailed walkthroughs of capture-the-flag challenges — cryptography, forensics, OSINT, web exploitation, and more.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ctfWriteups.map((writeup, index) => (
            <motion.div
              key={writeup.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/ctf/${writeup.slug}`}
                className="group relative block p-6 rounded-2xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                    <Shield size={10} />
                    CTF
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {writeup.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {writeup.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {writeup.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText size={12} />
                    {writeup.challengeCount} challenges
                  </span>
                  <span>{writeup.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTFWriteupsSection;
