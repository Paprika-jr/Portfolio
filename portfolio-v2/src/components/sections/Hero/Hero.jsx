import { motion } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../../utils/constants';
import { GithubIcon, LinkedinIcon, DownloadIcon } from '../../common/Icons';
import BackgroundParticles from '../../common/BackgroundParticles';
import Guitar3D from './Guitar3D';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" data-section id="home">
      {/* Animated Background Particles */}
      <BackgroundParticles />

      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {PERSONAL_INFO.title}
            </motion.p>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.a
                href="/KhunHtetLinAung.Cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-cursor-hover
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DownloadIcon size={20} />
                View CV
              </motion.a>

              <div className="hero-social">
                <motion.a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  data-cursor-hover
                  aria-label="GitHub"
                >
                  <GithubIcon size={22} />
                </motion.a>
                <motion.a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  data-cursor-hover
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={22} />
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="guitar-canvas-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Guitar3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
