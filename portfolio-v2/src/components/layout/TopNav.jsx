import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useSound } from '../../hooks/useSound';
import { NAVIGATION_SECTIONS, SOCIAL_LINKS } from '../../utils/constants';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../common/Icons';
import './TopNav.css';

const TopNav = () => {
  const { activeSection, scrollToSection } = useScrollAnimation();
  const { playClick } = useSound();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [blobPosition, setBlobPosition] = useState({ x: 0, width: 90 });

  const navLinkRefs = useRef([]);
  const navLinksContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update blob position based on actual element positions
  useEffect(() => {
    const updateBlobPosition = () => {
      const targetIndex = hoveredIndex !== null ? hoveredIndex : activeSection;
      const targetElement = navLinkRefs.current[targetIndex];
      const container = navLinksContainerRef.current;

      if (targetElement && container) {
        const targetRect = targetElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const leftPosition = targetRect.left - containerRect.left - 3; // Shift 3px to the left

        setBlobPosition({
          x: leftPosition,
          width: targetRect.width,
        });
      }
    };

    updateBlobPosition();
    window.addEventListener('resize', updateBlobPosition);
    return () => window.removeEventListener('resize', updateBlobPosition);
  }, [activeSection, hoveredIndex]);

  const handleNavClick = (index) => {
    scrollToSection(index);
    playClick();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    playClick();
  };

  return (
    <motion.nav
      className={`top-nav ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
    >
      <div className="nav-container">
        {/* Logo/Name */}
        <motion.div
          className="nav-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">KHLA</span>
        </motion.div>

        {/* Navigation Links */}
        <div className="nav-links" ref={navLinksContainerRef}>
          {NAVIGATION_SECTIONS.map((section, index) => (
            <NavLink
              key={section.id}
              section={section}
              index={index}
              isActive={activeSection === index}
              isHovered={hoveredIndex === index}
              onClick={() => handleNavClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              ref={(el) => (navLinkRefs.current[index] = el)}
            />
          ))}

          {/* Animated background blob that follows active/hovered item */}
          <motion.div
            className="nav-blob"
            animate={{
              x: blobPosition.x,
              width: blobPosition.width,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 28,
            }}
          />
        </div>

        {/* Social Icons - Figma mockup style */}
        <div className="nav-social">
          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            data-cursor-hover
            aria-label="GitHub"
          >
            <GithubIcon size={20} />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            data-cursor-hover
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={20} />
          </motion.a>
          <motion.a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            data-cursor-hover
            aria-label="Instagram"
          >
            <InstagramIcon size={20} />
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {NAVIGATION_SECTIONS.map((section, index) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className={`mobile-menu-link ${activeSection === index ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(index);
              }}
              whileTap={{ scale: 0.95 }}
            >
              {section.label}
            </motion.a>
          ))}

          {/* Social Icons in Mobile Menu */}
          <div className="mobile-menu-social">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon size={20} />
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon size={20} />
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={20} />
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

// Individual Nav Link Component with magnetic effect
const NavLink = React.forwardRef(({ section, isActive, isHovered, onClick, onMouseEnter, onMouseLeave }, ref) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (magnetic effect)
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply magnetic pull (max 10px)
    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onMouseLeave();
  };

  return (
    <motion.a
      ref={ref}
      href={`#${section.id}`}
      className={`nav-link ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      data-cursor-hover
    >
      <span className="nav-link-text">{section.label}</span>

      {/* Liquid underline effect */}
      <motion.div
        className="nav-link-underline"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
});

export default TopNav;
