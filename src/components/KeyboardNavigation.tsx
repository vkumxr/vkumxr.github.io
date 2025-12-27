import { useEffect } from 'react';

const sections = [
  { key: '1', id: 'home', label: 'Home' },
  { key: '2', id: 'about', label: 'About' },
  { key: '3', id: 'skills', label: 'Skills' },
  { key: '4', id: 'experience', label: 'Experience' },
  { key: '5', id: 'projects', label: 'Projects' },
  { key: '6', id: 'contact', label: 'Contact' },
];

const KeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Check for number keys 1-7
      const section = sections.find((s) => s.key === e.key);
      if (section) {
        const element = document.getElementById(section.id);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Home key - scroll to top
      if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // End key - scroll to bottom
      if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return null; // This component doesn't render anything
};

export default KeyboardNavigation;
