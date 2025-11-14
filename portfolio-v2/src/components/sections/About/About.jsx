import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { PERSONAL_INFO } from '../../../utils/constants';
import { LocationIcon, SchoolIcon, BriefcaseIcon } from '../../common/Icons';
import BackgroundParticles from '../../common/BackgroundParticles';
import AmpSkills from './AmpSkills';
import './About.css';

const About = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section className="about-section" data-section id="about" ref={targetRef}>
      <BackgroundParticles />
      <div className="container">
        {/* Section Header */}
        <div className={`section-header ${hasIntersected ? 'in-view' : ''}`}>
          <motion.div
            className="section-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Get to Know Me
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A developer who codes with the rhythm of a guitarist
          </motion.p>
        </div>

        {/* About Content Grid */}
        <div className="about-content">
          {/* About Text */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>
              Hello! I'm a dedicated second-year ICT student at Jamk University of Applied Sciences
              in Finland. I enjoy building practical, clean interfaces and shipping real products like
              a production-ready digital menu and ordering system for cafés.
            </p>
            <p>
              I'm particularly interested in web development, software engineering, and the intersection
              of technology with creative arts. My background in music gives me a unique perspective on
              creating harmonious user experiences.
            </p>
            <p>
              Always eager to learn new technologies and contribute to meaningful projects that make
              a difference in people's lives.
            </p>

            {/* Quick Facts */}
            <div className="quick-facts">
              <div className="fact-item">
                <span className="fact-icon">
                  <LocationIcon size={24} />
                </span>
                <div>
                  <strong>Location</strong>
                  <p>{PERSONAL_INFO.location}</p>
                </div>
              </div>
              <div className="fact-item">
                <span className="fact-icon">
                  <SchoolIcon size={24} />
                </span>
                <div>
                  <strong>Education</strong>
                  <p>ICT at Jamk (2nd Year)</p>
                </div>
              </div>
              <div className="fact-item">
                <span className="fact-icon">
                  <BriefcaseIcon size={24} />
                </span>
                <div>
                  <strong>Status</strong>
                  <p>Open to opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Amp Skills */}
          <motion.div
            className="skills-fretboard"
            initial={{ opacity: 0, x: 30 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AmpSkills />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
