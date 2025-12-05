// src/components/ThemeRegistry.tsx
'use client';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      // Use a subtle dark default so sections can share the same dark tint
      // Keep `paper` light so small UI surfaces (icons/cards) retain contrast
      default: '#0f1724', // slate-900 / near-black navy
      paper: '#ffffff',
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline provides baseline styles; GlobalStyles enforces body bg/text from theme */}
        <CssBaseline />
        <GlobalStyles styles={(theme) => ({
          body: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.getContrastText(theme.palette.background.default),
          },
        })} />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}