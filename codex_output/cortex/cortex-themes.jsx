/* CORTEX EDUCATION — Theme Engine */
/* 5 Distinct Theme Configurations + React Context */

const THEMES = {
  neural: {
    id: 'neural',
    name: 'Neural Pulse',
    emoji: '🧠',
    description: 'Cerebral synaptic energy',
    colors: {
      bg: '#0a0a1a',
      bgAlt: '#12102a',
      surface: 'rgba(120, 80, 255, 0.08)',
      glass: 'rgba(120, 80, 255, 0.12)',
      glassBorder: 'rgba(160, 120, 255, 0.25)',
      glassHighlight: 'rgba(180, 140, 255, 0.15)',
      accent1: '#a855f7',
      accent2: '#fbbf24',
      accent3: '#6366f1',
      text: '#f0eaff',
      textSecondary: 'rgba(220, 200, 255, 0.6)',
      textMuted: 'rgba(200, 180, 255, 0.35)',
      gradientMain: 'linear-gradient(135deg, #6366f1, #a855f7, #fbbf24)',
      gradientCard: 'linear-gradient(145deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))',
      gradientAccent: 'linear-gradient(135deg, #a855f7, #6366f1)',
      glow: '168, 85, 247',
      shadowColor: 'rgba(99, 102, 241, 0.3)',
    },
    glass: { blur: 28, saturation: 200, bgOpacity: 0.1, borderOpacity: 0.2 },
    borderRadius: 22,
    fontWeight: { heading: 700, body: 400 },
  },

  aurora: {
    id: 'aurora',
    name: 'Aurora Prism',
    emoji: '🌌',
    description: 'Ethereal northern lights',
    colors: {
      bg: '#050a18',
      bgAlt: '#0a1628',
      surface: 'rgba(0, 220, 200, 0.06)',
      glass: 'rgba(80, 200, 255, 0.1)',
      glassBorder: 'rgba(100, 240, 255, 0.2)',
      glassHighlight: 'rgba(130, 255, 230, 0.12)',
      accent1: '#06d6a0',
      accent2: '#e040fb',
      accent3: '#00b4d8',
      text: '#e0fff8',
      textSecondary: 'rgba(200, 255, 240, 0.6)',
      textMuted: 'rgba(180, 240, 230, 0.3)',
      gradientMain: 'linear-gradient(135deg, #00b4d8, #06d6a0, #e040fb)',
      gradientCard: 'linear-gradient(145deg, rgba(6,214,160,0.12), rgba(0,180,216,0.06))',
      gradientAccent: 'linear-gradient(135deg, #06d6a0, #00b4d8)',
      glow: '6, 214, 160',
      shadowColor: 'rgba(0, 180, 216, 0.3)',
    },
    glass: { blur: 32, saturation: 180, bgOpacity: 0.08, borderOpacity: 0.18 },
    borderRadius: 26,
    fontWeight: { heading: 600, body: 400 },
  },

  gold: {
    id: 'gold',
    name: 'Liquid Gold',
    emoji: '✨',
    description: 'Premium luxury edition',
    colors: {
      bg: '#0c0a08',
      bgAlt: '#1a1510',
      surface: 'rgba(212, 175, 55, 0.06)',
      glass: 'rgba(212, 175, 55, 0.08)',
      glassBorder: 'rgba(212, 175, 55, 0.25)',
      glassHighlight: 'rgba(255, 215, 100, 0.12)',
      accent1: '#d4af37',
      accent2: '#e8c4a0',
      accent3: '#b8860b',
      text: '#fff5e0',
      textSecondary: 'rgba(255, 235, 200, 0.6)',
      textMuted: 'rgba(220, 200, 160, 0.35)',
      gradientMain: 'linear-gradient(135deg, #b8860b, #d4af37, #f5d67b)',
      gradientCard: 'linear-gradient(145deg, rgba(212,175,55,0.1), rgba(184,134,11,0.05))',
      gradientAccent: 'linear-gradient(135deg, #d4af37, #f5d67b)',
      glow: '212, 175, 55',
      shadowColor: 'rgba(212, 175, 55, 0.25)',
    },
    glass: { blur: 24, saturation: 160, bgOpacity: 0.06, borderOpacity: 0.22 },
    borderRadius: 18,
    fontWeight: { heading: 300, body: 300 },
  },

  neon: {
    id: 'neon',
    name: 'Neon Matrix',
    emoji: '💚',
    description: 'Cyberpunk hacker vibes',
    colors: {
      bg: '#030806',
      bgAlt: '#0a1a0f',
      surface: 'rgba(0, 255, 120, 0.05)',
      glass: 'rgba(0, 255, 120, 0.08)',
      glassBorder: 'rgba(0, 255, 120, 0.2)',
      glassHighlight: 'rgba(0, 255, 180, 0.1)',
      accent1: '#00ff88',
      accent2: '#00e5ff',
      accent3: '#ff0080',
      text: '#e0ffe8',
      textSecondary: 'rgba(200, 255, 220, 0.6)',
      textMuted: 'rgba(150, 255, 200, 0.3)',
      gradientMain: 'linear-gradient(135deg, #00ff88, #00e5ff, #ff0080)',
      gradientCard: 'linear-gradient(145deg, rgba(0,255,136,0.08), rgba(0,229,255,0.04))',
      gradientAccent: 'linear-gradient(135deg, #00ff88, #00e5ff)',
      glow: '0, 255, 136',
      shadowColor: 'rgba(0, 255, 136, 0.3)',
    },
    glass: { blur: 20, saturation: 150, bgOpacity: 0.06, borderOpacity: 0.15 },
    borderRadius: 12,
    fontWeight: { heading: 700, body: 400 },
  },

  bloom: {
    id: 'bloom',
    name: 'Sunset Bloom',
    emoji: '🌸',
    description: 'Warm radiant energy',
    colors: {
      bg: '#1a0a14',
      bgAlt: '#24101c',
      surface: 'rgba(255, 120, 100, 0.06)',
      glass: 'rgba(255, 150, 120, 0.1)',
      glassBorder: 'rgba(255, 180, 160, 0.2)',
      glassHighlight: 'rgba(255, 200, 180, 0.12)',
      accent1: '#ff6b6b',
      accent2: '#feca57',
      accent3: '#a29bfe',
      text: '#fff0f0',
      textSecondary: 'rgba(255, 220, 210, 0.65)',
      textMuted: 'rgba(255, 200, 190, 0.35)',
      gradientMain: 'linear-gradient(135deg, #ff6b6b, #feca57, #a29bfe)',
      gradientCard: 'linear-gradient(145deg, rgba(255,107,107,0.12), rgba(254,202,87,0.06))',
      gradientAccent: 'linear-gradient(135deg, #ff6b6b, #feca57)',
      glow: '255, 107, 107',
      shadowColor: 'rgba(255, 107, 107, 0.3)',
    },
    glass: { blur: 30, saturation: 190, bgOpacity: 0.1, borderOpacity: 0.18 },
    borderRadius: 28,
    fontWeight: { heading: 800, body: 400 },
  },
};

const ThemeContext = React.createContext();

function ThemeProvider({ themeId, children }) {
  const theme = THEMES[themeId] || THEMES.neural;
  return React.createElement(ThemeContext.Provider, { value: theme }, children);
}

function useTheme() {
  return React.useContext(ThemeContext);
}

function glassStyle(theme, extra = {}) {
  return {
    backdropFilter: `blur(${theme.glass.blur}px) saturate(${theme.glass.saturation}%)`,
    WebkitBackdropFilter: `blur(${theme.glass.blur}px) saturate(${theme.glass.saturation}%)`,
    background: theme.colors.glass,
    border: `1px solid ${theme.colors.glassBorder}`,
    borderRadius: theme.borderRadius,
    ...extra,
  };
}

function glassCardStyle(theme, extra = {}) {
  return {
    ...glassStyle(theme),
    boxShadow: `0 8px 32px ${theme.colors.shadowColor}, inset 0 1px 0 ${theme.colors.glassHighlight}`,
    ...extra,
  };
}

Object.assign(window, { THEMES, ThemeContext, ThemeProvider, useTheme, glassStyle, glassCardStyle });
