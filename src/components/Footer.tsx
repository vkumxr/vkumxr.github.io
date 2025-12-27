import { Github, Linkedin, Mail, Twitter, Instagram, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Vishwa Kumar. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/vkumxr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/vishwakumarv/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://x.com/vkumxrr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.instagram.com/vishwakumar_vk/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://substack.com/@vkumxr"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Substack"
            >
              <BookOpen size={18} />
            </a>
            <a
              href="mailto:vishwakumarv05@gmail.com"
              className="social-icon"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
