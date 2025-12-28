// src/components/about/AboutHero.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, useTheme, Fade } from '@mui/material';
import { useTranslations } from 'next-intl';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const AboutHero = () => {
  const t = useTranslations('About.Hero');
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '85vh', // Tall, cinematic height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        // Layer 1: The Obsidian Base
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Layer 2: The Moroccan Heritage Texture (Blended) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/about/hero-morocco.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15, // Very subtle, ghost-like texture
          filter: 'grayscale(100%) contrast(1.2)', // Moody B&W
          zIndex: 0,
        }}
      />

      {/* Layer 3: The "Vignette" Gradient (Focus on center) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, transparent 0%, ${theme.palette.background.default} 90%)`,
          zIndex: 1,
        }}
      />

      {/* Layer 4: The Amber Glow (Subtle bottom light source) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '400px',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: 1,
        }}
      />

      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center',
          pt: { xs: 10, md: 0 } // Mobile spacing for navbar
        }}
      >
        <Fade in={true} timeout={1000}>
          <Box>
            {/* The "Cinematic Label" */}
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.secondary.main,
                letterSpacing: 4,
                fontWeight: 700,
                mb: 3,
                display: 'block',
                fontSize: '0.85rem',
                opacity: 0.9
              }}
            >
              EST. 2024 • MARRAKECH
            </Typography>

            {/* The Editorial Headline */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '5rem' }, // Massive
                lineHeight: 1.1,
                mb: 4,
                color: 'white',
                letterSpacing: '-0.02em',
                whiteSpace: 'pre-wrap', 
                // Ensure we use the Serif font for that "Documentary" feel
                fontFamily: theme.typography.h1.fontFamily 
              }}
            >
              {t.rich('title', {
                // The "Amber Gold" Highlight
                colored: (chunks) => (
                  <Box 
                    component="span" 
                    sx={{ 
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, #ffffff 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontStyle: 'italic',
                      paddingRight: '0.1em' // Fix for italic clipping
                    }}
                  >
                    {chunks}
                  </Box>
                )
              })}
            </Typography>

            {/* The Subtitle */}
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                fontWeight: 300,
                maxWidth: '750px',
                mx: 'auto',
                color: 'text.secondary',
                lineHeight: 1.8,
              }}
            >
              {t.rich('subtitle', {
                strong: (chunks) => <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{chunks}</Box>
              })}
            </Typography>
          </Box>
        </Fade>
      </Container>

      {/* Scroll Indicator (Encourages reading the story) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': { transform: 'translate(-50%, 0)' },
            '40%': { transform: 'translate(-50%, -10px)' },
            '60%': { transform: 'translate(-50%, -5px)' },
          },
        }}
      >
        <KeyboardArrowDownIcon sx={{ color: 'white', opacity: 0.3, fontSize: 40 }} />
      </Box>
    </Box>
  );
};

export default AboutHero;