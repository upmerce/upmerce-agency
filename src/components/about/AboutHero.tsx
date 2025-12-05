// /src/components/about/AboutHero.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';

const AboutHero = () => {
  const t = useTranslations('About.Hero');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '70vh', md: '80vh' }, 
        minHeight: '500px',
        display: 'flex',
        // We keep alignItems center, but use padding below to push content down
        alignItems: 'center', 
        color: 'common.white',
        // Make sure this image path is correct!
        backgroundImage: `url('/images/about/hero-morocco.webp')`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        },
      }}
    >
      {/* ▼▼▼ THE FIX IS HERE ▼▼▼ */}
      {/* Added pt (padding-top) to push content below the fixed header */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center',
          pt: { xs: 10, md: 12 } // ~80px on mobile, ~96px on desktop extra top spacing
        }}
      >
      {/* ▲▲▲ */}
        
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', sm: '3rem', md: '4.5rem' },
            lineHeight: 1.1,
            mb: 4,
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            // ▼▼▼ THE MAGIC CSS RULE FOR LINE BREAKS ▼▼▼
            whiteSpace: 'pre-wrap', 
          }}
        >
          {t.rich('title', {
            // The color highlighter
            colored: (chunks) => <Box component="span" sx={{ color: 'primary.main' }}>{chunks}</Box>
          })}
        </Typography>

        <Typography
          variant="h2"
          component="p"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.5rem' },
            fontWeight: 400,
            maxWidth: '800px',
            mx: 'auto',
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
           {t.rich('subtitle', {
              strong: (chunks) => <strong>{chunks}</strong>
           })}
        </Typography>
      </Container>
    </Box>
  );
};

export default AboutHero;