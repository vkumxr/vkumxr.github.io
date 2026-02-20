import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Shield, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ctfWriteups } from '@/data/ctfWriteups';
import type { CTFChallenge } from '@/data/ctfWriteups';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categoryColors: Record<string, string> = {
  Crypto: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  OSINT: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Forensics: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Web: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Misc: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Hardware: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

const ChallengeCard = ({ challenge, index }: { challenge: CTFChallenge; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorClass = categoryColors[challenge.category] || 'bg-muted text-muted-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      viewport={{ once: true }}
      className="border border-border rounded-xl overflow-hidden bg-card"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/30 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-mono text-muted-foreground w-6 shrink-0">
            #{challenge.id}
          </span>
          <h3 className="font-semibold text-foreground truncate">{challenge.title}</h3>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${colorClass}`}>
            {challenge.category}
          </span>
          {challenge.points && (
            <span className="text-xs text-muted-foreground shrink-0">{challenge.points} pts</span>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`text-muted-foreground shrink-0 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                  Description
                </h4>
                <p className="text-sm text-foreground/80">{challenge.description}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                  Solution
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">{challenge.solution}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">
                  Flag
                </h4>
                <code className="text-sm font-mono bg-muted px-3 py-1.5 rounded-md text-primary inline-block break-all">
                  {challenge.flag}
                </code>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CTFWriteupDetail = () => {
  const { slug } = useParams();
  const writeup = ctfWriteups.find((w) => w.slug === slug);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  if (!writeup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Writeup not found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const filteredChallenges = activeFilter
    ? writeup.challenges.filter((c) => c.category === activeFilter)
    : writeup.challenges;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-6">
          <Link
            to="/#ctf-writeups"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to CTF Writeups
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield size={24} className="text-primary" />
              <span className="text-sm text-muted-foreground">{writeup.date}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {writeup.title}
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mb-6">
              {writeup.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {writeup.challengeCount} challenges solved
              </span>
              <a
                href={writeup.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <Download size={14} />
                Download PDF
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter + Challenges */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveFilter(null)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                !activeFilter
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
              }`}
            >
              All ({writeup.challenges.length})
            </button>
            {writeup.categories.map((cat) => {
              const count = writeup.challenges.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    activeFilter === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-transparent text-muted-foreground border-border hover:border-foreground/30'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Challenges list */}
          <div className="space-y-3">
            {filteredChallenges.map((challenge, index) => (
              <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CTFWriteupDetail;
