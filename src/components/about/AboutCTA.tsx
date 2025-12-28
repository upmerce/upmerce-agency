// src/components/about/AboutCTA.tsx
'use client';
import React from 'react';
import { Box, Container, Typography, Button, Stack, useTheme } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const AboutCTA = () => {
  const t = useTranslations('About.CTA');
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 12 },
        // The "Obsidian" Background with Amber Center Glow
        backgroundColor: theme.palette.background.default,
        backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.palette.secondary.main}15 0%, transparent 60%)`,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 800, 
            mb: 3,
            fontSize: { xs: '2rem', md: '3.5rem' },
            color: 'white',
            letterSpacing: '-0.02em'
          }}
        >
          {t('headline')}
        </Typography>
        
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 6, 
            color: 'text.secondary',
            fontWeight: 400,
            maxWidth: '700px',
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          {t('subtitle')}
        </Typography>

        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          justifyContent="center"
          alignItems="center"
        >
          {/* Primary Action - "Millionaire" Style (White Pill) */}
          <Button
            component={Link}
            href="/campaign"
            variant="contained"
            size="large"
            startIcon={<RocketLaunchIcon />}
            sx={{ 
              py: 1.5, px: 5, 
              fontSize: '1.1rem', 
              fontWeight: 700,
              borderRadius: '50px', // Pill shape
              backgroundColor: 'white',
              color: 'black',
              boxShadow: `0 0 20px ${theme.palette.secondary.main}40`, // Amber Glow
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: `0 0 30px ${theme.palette.secondary.main}60`,
              }
            }}
          >
            {t('primaryButton')}
          </Button>

          {/* Secondary Action - Glass Outline */}
          <Button
            href="https://www.marrago.com"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            size="large"
            endIcon={<OpenInNewIcon />}
            sx={{ 
              py: 1.5, px: 5, 
              fontSize: '1.1rem', 
              fontWeight: 600,
              borderRadius: '50px',
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': { 
                borderColor: 'white', 
                backgroundColor: 'rgba(255,255,255,0.05)' 
              }
            }}
          >
            {t('secondaryButton')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutCTA;