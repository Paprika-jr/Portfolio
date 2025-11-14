import { motion } from 'framer-motion';
import { GithubIcon, LinkedinIcon, InstagramIcon, GuitarIcon, MusicNoteIcon } from '../common/Icons';
import { SOCIAL_LINKS, PERSONAL_INFO } from '../../utils/constants';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <motion.div
              className="footer-logo"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <GuitarIcon size={32} />
            </motion.div>
            <h3 className="footer-title">KHLA</h3>
            <p className="footer-tagline">
              Coded with <MusicNoteIcon size={16} /> and passion
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-social-section">
            <h4>Connect</h4>
            <div className="footer-social">
              <motion.a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </motion.a>
            </div>
          </div>

          {/* Location */}
          <div className="footer-location">
            <h4>Location</h4>
            <p>{PERSONAL_INFO.location}</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
