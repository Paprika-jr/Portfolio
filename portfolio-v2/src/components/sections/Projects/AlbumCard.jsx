import { motion } from 'framer-motion';
import { ExternalLinkIcon, CodeIcon, SettingsIcon } from '../../common/Icons';
import './AlbumCard.css';

const AlbumCard = ({ project, index, hasIntersected }) => {
  return (
    <motion.div
      className="album-card-container"
      initial={{ opacity: 0, y: 50 }}
      animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
      whileHover={{ y: -10 }}
    >
      <div className="album-card" data-cursor-hover>
        {/* Project Icon/Emoji Header */}
        <div className="project-header" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}DD)` }}>
          <div className="project-emoji">{project.emoji}</div>
        </div>

        {/* Project Content */}
        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          {/* Tech Stack */}
          <div className="tech-stack">
            <div className="tech-stack-label">Tech Stack</div>
            <div className="tech-tags">
              {project.tags.map((tag, i) => (
                <span key={i} className="tech-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.keys(project.links).length > 0 && (
            <div className="project-links">
              {project.links.demo && project.links.demo !== '#' && (
                <a
                  href={project.links.demo}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                >
                  <ExternalLinkIcon size={16} /> Live Demo
                </a>
              )}
              {project.links.code && project.links.code !== '#' && (
                <a
                  href={project.links.code}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                >
                  <CodeIcon size={16} /> Code
                </a>
              )}
              {project.links.admin && (
                <a
                  href={project.links.admin}
                  className="project-link project-link-admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                >
                  <SettingsIcon size={16} /> Admin
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumCard;
