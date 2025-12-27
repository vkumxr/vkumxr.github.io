import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '#home', isSection: true },
  { label: 'About', href: '#about', isSection: true },
  { label: 'Skills', href: '#skills', isSection: true },
  { label: 'Experience', href: '#experience', isSection: true },
  { label: 'Projects', href: '#projects', isSection: true },
  { label: 'Blog', href: '/blog', isSection: false },
  { label: 'Contact', href: '#contact', isSection: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (!isHomePage) return;

      const sectionItems = navItems.filter((item) => item.isSection);
      const sections = sectionItems.map((item) => item.href.slice(1));
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsMobileMenuOpen(false);
    
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-foreground/95 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold text-background">
            VK
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.isSection ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive(item)
                        ? 'text-background'
                        : 'text-background/60 hover:text-background'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      isActive(item)
                        ? 'text-background'
                        : 'text-background/60 hover:text-background'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-background"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.isSection ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                      isActive(item)
                        ? 'bg-background/10 text-background'
                        : 'text-background/60 hover:text-background hover:bg-background/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                      isActive(item)
                        ? 'bg-background/10 text-background'
                        : 'text-background/60 hover:text-background hover:bg-background/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
