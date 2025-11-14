import { useEffect, useState } from 'react';

export const useScrollAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 100)
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / windowHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Determine active section
      const sections = document.querySelectorAll('section[data-section]');
      let current = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 300) {
          current = index;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (index) => {
    const sections = document.querySelectorAll('section[data-section]');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollProgress, activeSection, scrollToSection };
};
