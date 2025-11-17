import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { NAVIGATION_SECTIONS } from '../../utils/constants';
import './GuitarStringsNav.css';

const GuitarStringsNav = () => {
  const { activeSection, scrollToSection } = useScrollAnimation();

  const handleStringClick = (index) => {
    scrollToSection(index);
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
