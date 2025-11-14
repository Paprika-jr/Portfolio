import { useState, useEffect } from 'react';
import { getCSSVariables } from '../styles/theme';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, default to dark
    const savedTheme = localStorage.getItem('portfolio-theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Apply CSS variables to root
    const root = document.documentElement;
    const variables = getCSSVariables(theme);

    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);

    // Add data-theme attribute for CSS selectors
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
};
