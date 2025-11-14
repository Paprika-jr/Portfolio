import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../../hooks/useSound';
import { ExternalLinkIcon, CodeIcon, SettingsIcon } from '../../common/Icons';
import './AlbumCard.css';

const AlbumCard = ({ project, index, hasIntersected }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { playClick } = useSound();

  const handleFlip = (e) => {
    // Don't flip if clicking on a link or the links container
    if (e.target.closest('.project-links') || e.target.closest('a')) {
      return;
    }
    setIsFlipped(!isFlipped);
    playClick();
  };

  return (
    <motion.div
      className="album-card-container"
      initial={{ opacity: 0, y: 50 }}
      animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
    >
      <div
        className={`album-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        data-cursor-hover
      >
        {/* Front Side - Album Cover */}
        <div className="album-front">
          {/* Vinyl Record spinning effect */}
          <div className="vinyl-record">
            <div className="vinyl-center"></div>
            <div className="vinyl-grooves"></div>
          </div>

          {/* Album Cover Art */}
          <div className="album-cover" style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}DD)` }}>
            <div className="album-icon">{project.emoji}</div>
            <div className="album-title-front">{project.title}</div>

            {/* Shine effect */}
            <div className="album-shine"></div>
          </div>

          {/* Click to flip indicator */}
          <div className="flip-indicator">
            <span>Click to see details</span>
          </div>
        </div>

        {/* Back Side - Project Details */}
        <div className="album-back">
          <div className="album-back-content">
            <h3 className="project-title">{project.title}</h3>

            <p className="project-description">{project.description}</p>

            {/* Tech Stack as Track List */}
            <div className="track-list">
              <div className="track-list-header">Tech Stack:</div>
              {project.tags.map((tag, i) => (
                <div key={i} className="track-item">
                  <span className="track-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="track-name">{tag}</span>
                </div>
              ))}
            </div>

            {/* Links */}
            {Object.keys(project.links).length > 0 && (
              <div
                className="project-links"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLinkIcon size={16} /> Live Demo
                  </a>
                )}
                {project.links.code && (
                  <a
                    href={project.links.code}
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CodeIcon size={16} /> Code
                  </a>
                )}
                {project.links.admin && (
                  <a
                    href={project.links.admin}
                    className="project-link"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SettingsIcon size={16} /> Admin
                  </a>
                )}
              </div>
            )}

            {/* Click to flip back */}
            <div className="flip-back-indicator">
              <span>Click to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumCard;
