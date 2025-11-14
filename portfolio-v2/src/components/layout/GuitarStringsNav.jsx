import { useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useSound } from '../../hooks/useSound';
import { NAVIGATION_SECTIONS, GUITAR_STRINGS } from '../../utils/constants';
import './GuitarStringsNav.css';

const GuitarStringsNav = () => {
  const { activeSection, scrollToSection } = useScrollAnimation();
  const { playString } = useSound();

  const handleStringClick = (index) => {
    scrollToSection(index);
    // Play the corresponding guitar string sound
    if (GUITAR_STRINGS[index]) {
      playString(GUITAR_STRINGS[index].frequency);
    }
  };

  return (
    <nav className="guitar-strings-nav" aria-label="Quick navigation">
      {NAVIGATION_SECTIONS.map((section, index) => (
        <div
          key={section.id}
          className={`guitar-string ${activeSection === index ? 'active' : ''}`}
          onClick={() => handleStringClick(index)}
          data-cursor-hover
          role="button"
          aria-label={`Navigate to ${section.label}`}
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleStringClick(index);
            }
          }}
        >
          <span className="string-label">{section.label}</span>
          <div className="string-line">
            <div className="string-dot"></div>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default GuitarStringsNav;
