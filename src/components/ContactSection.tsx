import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { staggerContainer, fadeUp } from '../hooks/useMotionAnimations';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'vishwakumarv05@gmail.com',
    href: 'mailto:vishwakumarv05@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vishwakumarv',
    href: 'https://linkedin.com/in/vishwakumarv/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/vkumxr',
    href: 'https://github.com/vkumxr',
  },
];

const ContactSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} id="contact" className="py-20 md:py-28 px-6 section-dark overflow-hidden relative">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg-light opacity-30" />

      <motion.div 
        className="container mx-auto max-w-2xl relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer(0.15, 0.1)}
      >
        <motion.div className="section-header text-center" variants={fadeUp}>
          <p className="section-label text-background/50">Get in touch</p>
          <h2 className="section-title text-background">Contact</h2>
        </motion.div>

        <motion.p 
          className="text-center text-background/70 mb-10 text-base"
          variants={fadeUp}
        >
          Open to internships, collaborations, and interesting security projects.
        </motion.p>

        <motion.div 
          className="space-y-3"
          variants={fadeUp}
        >
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-between p-4 bg-background/5 border border-background/10 rounded-lg hover:border-background/25 hover:bg-background/10 transition-colors group"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-background/10 flex items-center justify-center">
                  <link.icon size={18} className="text-background/70" />
                </div>
                <div>
                  <p className="text-sm font-medium text-background">{link.label}</p>
                  <p className="text-sm text-background/50">{link.value}</p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-background/40 group-hover:text-background/70 transition-colors" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
