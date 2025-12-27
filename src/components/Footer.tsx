import { Github, Linkedin, Mail, Twitter, Instagram, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-current/10">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-current/60 text-sm">
            © {new Date().getFullYear()} Vishwa Kumar. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/vkumxr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-current/20 text-current/60 hover:border-current hover:text-current transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/vishwakumarv/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-current/20 text-current/60 hover:border-current hover:text-current transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://x.com/vkumxrr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-current/20 text-current/60 hover:border-current hover:text-current transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a
              href="https://www.instagram.com/vishwakumar_vk/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-current/20 text-current/60 hover:border-current hover:text-current transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://substack.com/@vkumxr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-current/20 text-current/60 hover:border-current hover:text-current transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="Substack"
            >
              <BookOpen size={18} />
            </a>
            <a
              href="mailto:vishwakumarv05@gmail.com"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-current/20 text-current/60 hover:border-current hover:text-current transition-all duration-300 hover:scale-110 hover:-translate-y-1"
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
