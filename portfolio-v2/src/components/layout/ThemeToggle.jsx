import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon } from '../common/Icons';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = (newTheme) => {
    if (theme !== newTheme) {
      toggleTheme();
    }
  };

  return (
    <div className="theme-toggle">
      <button
        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => handleToggle('dark')}
        aria-label="Dark mode"
        data-cursor-hover
      >
        <MoonIcon size={20} />
      </button>
      <button
        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
        onClick={() => handleToggle('light')}
        aria-label="Light mode"
        data-cursor-hover
      >
        <SunIcon size={20} />
      </button>
    </div>
  );
};

export default ThemeToggle;
