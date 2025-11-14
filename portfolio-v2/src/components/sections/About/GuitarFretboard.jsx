import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../../hooks/useSound';
import { SKILLS, GUITAR_STRINGS } from '../../../utils/constants';
import './GuitarFretboard.css';

const GuitarFretboard = () => {
  const { playString, playClick } = useSound();
  const [activeSkill, setActiveSkill] = useState(null);

  // Flatten all skills into one array
  const allSkills = [
    ...SKILLS.frontend,
    ...SKILLS.backend,
    ...SKILLS.tools,
  ];

  const handleSkillClick = (skill, stringIndex) => {
    setActiveSkill(skill);
    playString(GUITAR_STRINGS[stringIndex % GUITAR_STRINGS.length].frequency);
  };

  return (
    <div className="fretboard-container">
      <div className="fretboard-header">
        <h3>Skills</h3>
        <p className="fretboard-subtitle">Click the notes to hear them play!</p>
      </div>

      <div className="fretboard">
        {/* Fret markers */}
        <div className="fret-markers">
          {[3, 5, 7, 9, 12].map((fret) => (
            <div key={fret} className="fret-marker" style={{ left: `${(fret / 12) * 100}%` }}>
              <div className="marker-dot"></div>
            </div>
          ))}
        </div>

        {/* Guitar Strings with Skills */}
        <div className="strings-container">
          {allSkills.map((skill, index) => {
            const stringIndex = index % 6;
            const fretPosition = skill.fret || (index % 12) + 1;

            return (
              <motion.div
                key={`${skill.name}-${index}`}
                className={`skill-note ${activeSkill?.name === skill.name ? 'active' : ''}`}
                style={{
                  top: `${(stringIndex / 5) * 90}%`,
                  left: `${(fretPosition / 12) * 85 + 5}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSkillClick(skill, stringIndex)}
                data-cursor-hover
              >
                <div className="note-circle">
                  <span className="skill-icon">{skill.icon}</span>
                </div>
                <div className="skill-tooltip">
                  <strong>{skill.name}</strong>
                  <span className="skill-level">{skill.level}</span>
                </div>
              </motion.div>
            );
          })}

          {/* Fretboard strings (visual lines) */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`string-${i}`}
              className="fretboard-string"
              style={{
                top: `${(i / 5) * 90 + 5}%`,
                height: `${1 + i * 0.2}px`,
              }}
            />
          ))}

          {/* Fret lines */}
          {[...Array(13)].map((_, i) => (
            <div
              key={`fret-${i}`}
              className="fret-line"
              style={{ left: `${(i / 12) * 85 + 5}%` }}
            />
          ))}
        </div>

        {/* Nut (left edge) */}
        <div className="fretboard-nut"></div>
      </div>

      {/* Active Skill Display */}
      {activeSkill && (
        <motion.div
          className="active-skill-display"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <span className="active-skill-icon">{activeSkill.icon}</span>
          <div>
            <strong>{activeSkill.name}</strong>
            <span className="level-badge">{activeSkill.level}</span>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="fretboard-legend">
        <div className="legend-item">
          <div className="legend-color beginner"></div>
          <span>Beginner (Fret 1-3)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color intermediate"></div>
          <span>Intermediate (Fret 4-7)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color advanced"></div>
          <span>Advanced (Fret 8-12)</span>
        </div>
      </div>
    </div>
  );
};

export default GuitarFretboard;
