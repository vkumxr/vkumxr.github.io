import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'HOME', href: '#home', isSection: true },
  { label: 'ABOUT', href: '#about', isSection: true },
  { label: 'SKILLS', href: '#skills', isSection: true },
  { label: 'EXPERIENCE', href: '#experience', isSection: true },
  { label: 'PROJECTS', href: '#projects', isSection: true },
  { label: 'CONTACT', href: '#contact', isSection: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (!isHomePage) return;

      // Detect active section
      const sections = navItems.filter(item => item.isSection).map(item => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsOpen(false);
    
    if (!item.isSection) return;

    if (!isHomePage) {
      window.location.href = '/' + item.href;
      return;
    }

    const element = document.getElementById(item.href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (item: typeof navItems[0]) => {
    if (!item.isSection) {
      return location.pathname.startsWith(item.href);
    }
    return isHomePage && activeSection === item.href.slice(1);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-panel border-b border-border' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-mono text-primary">
            <Terminal size={20} />
            <span className="text-sm tracking-wider">VK://</span>
          </Link>

          {/* Desktop Navigation - Command Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.isSection ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`nav-link nav-link-underline px-4 py-2 ${
                      isActive(item) ? 'text-primary active' : ''
                    }`}
                  >
                    [{item.label}]
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`nav-link nav-link-underline px-4 py-2 ${
                      isActive(item) ? 'text-primary active' : ''
                    }`}
                  >
                    [{item.label}]
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden glass-panel border-t border-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="container mx-auto px-6 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.isSection ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`block w-full text-left py-2 font-mono text-sm ${
                        isActive(item) ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {'>'} {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full text-left py-2 font-mono text-sm ${
                        isActive(item) ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {'>'} {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
