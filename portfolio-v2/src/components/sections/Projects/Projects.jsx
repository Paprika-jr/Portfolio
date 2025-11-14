import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { PROJECTS } from '../../../utils/constants';
import BackgroundParticles from '../../common/BackgroundParticles';
import AlbumCard from './AlbumCard';
import './Projects.css';

const Projects = () => {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section className="projects-section" data-section id="projects" ref={targetRef}>
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
            My Work
          </motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real solutions for real problems
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {PROJECTS.map((project, index) => (
            <AlbumCard
              key={project.id}
              project={project}
              index={index}
              hasIntersected={hasIntersected}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
