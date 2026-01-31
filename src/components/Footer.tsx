import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Instagram, BookOpen } from 'lucide-react';
import { MagneticWrapper } from './motion/MagneticButton';
import { springPresets } from '@/hooks/useMotionAnimations';

const socialLinks = [
  { href: 'https://github.com/vkumxr', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/vishwakumarv/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://x.com/vkumxrr', icon: Twitter, label: 'Twitter' },
  { href: 'https://www.instagram.com/vishwakumar_vk/', icon: Instagram, label: 'Instagram' },
  { href: 'https://substack.com/@vkumxr', icon: BookOpen, label: 'Substack' },
  { href: 'mailto:vishwakumarv05@gmail.com', icon: Mail, label: 'Email' },
];

const Footer = () => {
  return (
    <motion.footer 
      className="py-8 px-6 border-t border-current/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p 
            className="text-current/60 text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            © {new Date().getFullYear()} Vishwa Kumar Venkateswaran. All rights reserved.
          </motion.p>
          
          <div className="flex items-center gap-3">
            {socialLinks.map((link, i) => (
              <MagneticWrapper key={link.label} strength={0.3} radius={60}>
                <motion.a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-current/20 text-current/60 hover:border-current hover:text-current transition-colors"
                  aria-label={link.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05, ...springPresets.bouncy }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon size={18} />
                </motion.a>
              </MagneticWrapper>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
