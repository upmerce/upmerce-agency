// src/config/theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';

// 1. Define Fonts (Simulated imports if you haven't set up next/font yet)
// In a real Next.js app, you would import these from 'next/font/google'
// and pass them to the theme typography.
const fontHeading = { style: { fontFamily: '"Playfair Display", "Times New Roman", serif' } };
const fontBody = { style: { fontFamily: '"Inter", "San Francisco", "Helvetica Neue", sans-serif' } };
const fontMono = { style: { fontFamily: '"Geist Mono", "JetBrains Mono", monospace' } };

// 2. The "Obsidian & Chrome" Palette
const colors = {
  obsidian: '#030303', // Deepest Background
  charcoal: '#0A0A0A', // Surface / Cards
  slate: '#1F1F1F',    // Borders
  white: '#FFFFFF',    // Text Primary
  gray: '#A1A1AA',     // Text Secondary
  amber: '#D97706',    // Moroccan Accent (The "Copper" feel)
  teal: '#2DD4BF',     // Success / Trust
  glass: 'rgba(255, 255, 255, 0.03)', // Subtle glass effect
};

// 3. Create the Theme
let theme = createTheme({
  palette: {
    mode: 'dark', // We force Dark Mode for that "Premium Tech" feel
    primary: {
      main: colors.white, // High contrast CTA
      contrastText: colors.obsidian,
    },
    secondary: {
      main: colors.amber,
      contrastText: colors.white,
    },
    background: {
      default: colors.obsidian,
      paper: colors.charcoal,
    },
    text: {
      primary: colors.white,
      secondary: colors.gray,
    },
    success: {
      main: colors.teal,
    },
    divider: colors.slate,
  },
  typography: {
    fontFamily: fontBody.style.fontFamily,
    h1: { ...fontHeading.style, fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { ...fontHeading.style, fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { ...fontHeading.style, fontWeight: 600, letterSpacing: '-0.01em' },
    h4: { ...fontHeading.style, fontWeight: 600 },
    h5: { ...fontBody.style, fontWeight: 600, letterSpacing: '-0.01em' },
    h6: { ...fontBody.style, fontWeight: 600 },
    button: { ...fontBody.style, fontWeight: 600, textTransform: 'none', letterSpacing: '-0.01em' },
    subtitle1: { ...fontBody.style, letterSpacing: '-0.01em', lineHeight: 1.6 },
    body1: { ...fontBody.style, lineHeight: 1.7 },
    body2: { ...fontBody.style, lineHeight: 1.6, color: colors.gray },
    caption: { ...fontMono.style, letterSpacing: '0.02em', textTransform: 'uppercase' },
  },
  shape: {
    borderRadius: 12, // Sharp/Modern
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.1)', // The "Inner Glow"
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: `0 0 20px rgba(255,255,255,0.2)`, // The "Luxury Glow"
          },
        },
        containedPrimary: {
          backgroundColor: colors.white,
          color: colors.obsidian,
          '&:hover': {
            backgroundColor: '#F0F0F0',
          },
        },
        outlined: {
          borderColor: colors.slate,
          color: colors.white,
          '&:hover': {
            borderColor: colors.white,
            backgroundColor: colors.glass,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove default MUI overlay
          backgroundColor: colors.charcoal,
          border: `1px solid ${colors.slate}`,
          transition: 'border-color 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: colors.glass,
          border: `1px solid ${colors.slate}`,
          backdropFilter: 'blur(8px)',
          fontWeight: 500,
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;