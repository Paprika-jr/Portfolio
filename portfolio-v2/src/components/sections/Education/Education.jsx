import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { EDUCATION } from '../../../utils/constants';
import { SchoolIcon, LocationIcon } from '../../common/Icons';
import BackgroundParticles from '../../common/BackgroundParticles';
import './Education.css';

const Education = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section className="education-section" data-section id="education" ref={targetRef}>
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
            My Journey
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Education
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Building knowledge, one milestone at a time
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {/* Timeline Line */}
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            animate={hasIntersected ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Timeline Items */}
          {EDUCATION.map((edu, index) => (
            <TimelineItem
              key={edu.year}
              education={edu}
              index={index}
              hasIntersected={hasIntersected}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Timeline Item Component
const TimelineItem = ({ education, index, hasIntersected }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`timeline-item ${isLeft ? 'left' : 'right'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
    >
      {/* Timeline Dot */}
      <motion.div
        className={`timeline-dot ${education.status === 'current' ? 'current' : ''}`}
        initial={{ scale: 0 }}
        animate={hasIntersected ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.6 + index * 0.2 }}
        whileHover={{ scale: 1.2 }}
        data-cursor-hover
      >
        {education.status === 'current' && (
          <motion.div
            className="pulse-ring"
            animate={{
              scale: [1, 1.5],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        )}
      </motion.div>

      {/* Timeline Content Card */}
      <motion.div
        className="timeline-content"
        whileHover={{ y: -5, boxShadow: '0 20px 50px var(--shadow-color)' }}
        data-cursor-hover
      >
        {/* Year Badge */}
        <div className="timeline-year">
          <span>{education.year}</span>
          {education.status === 'current' && <span className="current-badge">Current</span>}
        </div>

        {/* Degree */}
        <h3 className="timeline-title">{education.degree}</h3>

        {/* Institution & Location */}
        <div className="timeline-institution">
          <span className="institution-icon">
            <SchoolIcon size={24} />
          </span>
          <div>
            <p className="institution-name">{education.institution}</p>
            <p className="institution-location">
              <LocationIcon size={16} className="location-icon-inline" />
              {education.location}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="timeline-description">{education.description}</p>

        {/* Decorative corner */}
        <div className="card-corner"></div>
      </motion.div>
    </motion.div>
  );
};

export default Education;
