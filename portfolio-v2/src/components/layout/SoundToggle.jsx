import { useSound } from '../../hooks/useSound';
import './SoundToggle.css';

const SoundToggle = () => {
  const { soundEnabled, toggleSound, playClick } = useSound();

  const handleToggle = () => {
    if (soundEnabled) {
      // Play sound before disabling
      playClick();
      setTimeout(toggleSound, 100);
    } else {
      toggleSound();
    }
  };

  return (
    <button
      className={`sound-toggle ${soundEnabled ? '' : 'muted'}`}
      onClick={handleToggle}
      aria-label={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
      title={soundEnabled ? 'Sound On' : 'Sound Off'}
      data-cursor-hover
    >
      {soundEnabled ? '🔊' : '🔇'}
    </button>
  );
};

export default SoundToggle;
