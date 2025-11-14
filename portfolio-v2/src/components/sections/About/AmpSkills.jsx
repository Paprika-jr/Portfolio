import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../../../hooks/useSound';
import { SKILLS } from '../../../utils/constants';
import './AmpSkills.css';

const AmpSkills = () => {
  const { playClick } = useSound();
  const [activeChannel, setActiveChannel] = useState('frontend');

  const channels = {
    frontend: { name: 'Frontend', color: '#8b5cf6' },
    backend: { name: 'Backend', color: '#ec4899' },
    tools: { name: 'Tools', color: '#3b82f6' },
  };

  const handleChannelSwitch = (channel) => {
    setActiveChannel(channel);
    playClick();
  };

  const getKnobRotation = (level) => {
    const levels = {
      'Beginner': 90,
      'Intermediate': 180,
      'Advanced': 270,
    };
    return levels[level] || 90;
  };

  const getVolumeBars = (level) => {
    const levels = {
      'Beginner': 3,
      'Intermediate': 6,
      'Advanced': 10,
    };
    return levels[level] || 3;
  };

  return (
    <div className="amp-skills">
      {/* Amp Header */}
      <div className="amp-skills-header">
        <div className="amp-brand">KHLA</div>
        <div className="amp-model">Skills Amplifier</div>
      </div>

      {/* Channel Selector */}
      <div className="channel-selector">
        {Object.entries(channels).map(([key, channel]) => (
          <button
            key={key}
            className={`channel-btn ${activeChannel === key ? 'active' : ''}`}
            onClick={() => handleChannelSwitch(key)}
            data-cursor-hover
            style={{
              '--channel-color': channel.color,
            }}
          >
            <div className="channel-led"></div>
            <span>{channel.name}</span>
          </button>
        ))}
      </div>

      {/* Control Panel */}
      <div className="amp-controls">
        {SKILLS[activeChannel].map((skill, index) => (
          <motion.div
            key={skill.name}
            className="amp-knob-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Knob */}
            <div
              className="amp-knob"
              onClick={playClick}
              data-cursor-hover
            >
              <div
                className="knob-dial"
                style={{
                  transform: `rotate(${getKnobRotation(skill.level)}deg)`,
                }}
              >
                <div className="knob-indicator"></div>
              </div>
              <div className="knob-center">
                <span className="skill-emoji">{skill.icon}</span>
              </div>
            </div>

            {/* Label */}
            <div className="knob-label">
              <div className="skill-name">{skill.name}</div>
            </div>

            {/* Volume Meter */}
            <div className="volume-meter">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`volume-bar ${i < getVolumeBars(skill.level) ? 'active' : ''}`}
                ></div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Power LED and Indicators */}
      <div className="amp-footer">
        <div className="power-indicator">
          <div className="power-led active"></div>
          <span>POWER</span>
        </div>
        <div className="standby-indicator">
          <div className="standby-led"></div>
          <span>STANDBY</span>
        </div>
      </div>

      {/* Speaker Grill */}
      <div className="amp-speaker-grill">
        <div className="grill-pattern">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="grill-dot"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmpSkills;
