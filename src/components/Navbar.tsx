import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

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
  const [isInHero, setIsInHero] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Check if we're in the hero section (dark background)
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsInHero(heroBottom > 80);
      }

      if (!isHomePage) {
        setIsInHero(false);
        return;
      }

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
    handleScroll(); // Initial check
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

  // Hero section is now light (section-light), so we use dark text colors
  // When scrolled past hero, check if we're on a dark or light section
  const textColor = 'text-foreground';
  const textColorMuted = 'text-muted-foreground';
  const hoverBg = 'hover:bg-foreground/5';
  const activeBg = 'bg-foreground/10';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-md border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className={`text-lg font-semibold ${textColor}`}>
            VK
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.isSection ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`nav-link-underline px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive(item)
                        ? `${textColor}`
                        : `${textColorMuted} hover:${textColor}`
                    }`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`nav-link-underline px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive(item)
                        ? `${textColor}`
                        : `${textColorMuted} hover:${textColor}`
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${textColorMuted} hover:${textColor} ${hoverBg} transition-all duration-200`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${textColorMuted} hover:${textColor} ${hoverBg} transition-all duration-200`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 ${textColor}`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                        ? `${activeBg} ${textColor}`
                        : `${textColorMuted} hover:${textColor} ${hoverBg}`
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
                        ? `${activeBg} ${textColor}`
                        : `${textColorMuted} hover:${textColor} ${hoverBg}`
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
