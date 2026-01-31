import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 section-cyber border-t border-border/50 relative">
      <div className="absolute inset-0 grid-animated opacity-10" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.a 
            href="#home"
            className="flex items-center gap-2 font-mono text-primary"
            whileHover={{ scale: 1.02 }}
          >
            <Terminal size={20} />
            <span className="text-sm tracking-wider">VK://SECURITY_CONSOLE</span>
          </motion.a>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              { href: 'https://github.com/vkumxr', icon: Github, label: 'GitHub' },
              { href: 'https://linkedin.com/in/vishwakumarv/', icon: Linkedin, label: 'LinkedIn' },
              { href: 'mailto:vishwakumarv05@gmail.com', icon: Mail, label: 'Email' },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="social-icon w-8 h-8"
                aria-label={link.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">©</span> {currentYear} VISHWA KUMAR
          </div>
        </div>

        {/* Terminal-style footer message */}
        <motion.div 
          className="mt-8 pt-6 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-primary">$</span> echo "Building secure systems, one line at a time"
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
