// Theme Configuration
export const theme = {
  colors: {
    dark: {
      bgPrimary: '#0a0a0f',
      bgSecondary: '#1a1a2e',
      bgCard: 'rgba(255, 255, 255, 0.05)',
      textPrimary: '#ffffff',
      textSecondary: '#b8b8d1',
      accentPrimary: '#8b5cf6',
      accentSecondary: '#ec4899',
      accentTertiary: '#3b82f6',
      borderColor: 'rgba(139, 92, 246, 0.2)',
      shadowColor: 'rgba(139, 92, 246, 0.3)',
      cursorTrail: '#8b5cf6',
    },
    light: {
      bgPrimary: '#fafafa',
      bgSecondary: '#ffffff',
      bgCard: 'rgba(0, 0, 0, 0.02)',
      textPrimary: '#1a1a1a',
      textSecondary: '#666666',
      accentPrimary: '#7c3aed',
      accentSecondary: '#db2777',
      accentTertiary: '#2563eb',
      borderColor: 'rgba(124, 58, 237, 0.2)',
      shadowColor: 'rgba(124, 58, 237, 0.15)',
      cursorTrail: '#7c3aed',
    },
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    secondary: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    light: {
      primary: 'linear-gradient(135deg, #7c3aed, #db2777)',
      secondary: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    },
  },
  fonts: {
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    weights: {
      normal: 400,
      medium: 600,
      bold: 700,
      black: 900,
    },
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  animations: {
    fast: '0.2s',
    medium: '0.4s',
    slow: '0.8s',
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    },
  },
};

// CSS Variables generator for theme
export const getCSSVariables = (mode = 'dark') => {
  const colors = theme.colors[mode];
  const gradients = mode === 'dark' ? theme.gradients : theme.gradients.light;

  return {
    '--bg-primary': colors.bgPrimary,
    '--bg-secondary': colors.bgSecondary,
    '--bg-card': colors.bgCard,
    '--text-primary': colors.textPrimary,
    '--text-secondary': colors.textSecondary,
    '--accent-primary': colors.accentPrimary,
    '--accent-secondary': colors.accentSecondary,
    '--accent-tertiary': colors.accentTertiary,
    '--border-color': colors.borderColor,
    '--shadow-color': colors.shadowColor,
    '--cursor-trail': colors.cursorTrail,
    '--gradient-primary': gradients.primary,
    '--gradient-secondary': gradients.secondary,
  };
};
