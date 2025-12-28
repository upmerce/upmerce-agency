// src/components/sections/HeroSection.tsx
'use client';

import React from 'react';
import { Box, Container, Typography, Button, useTheme, Chip, Fade } from '@mui/material';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AnimatedSection from '../ui/AnimatedSection';

export default function HeroSection() {
  const t = useTranslations('AgencyHero');
  const theme = useTheme();

  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default, // Obsidian Base
      }}
    >
      {/* LAYER 1: THE TEXTURE 
         Use an abstract "Network/Mesh" image here.
         It represents the "Infrastructure" you provide.
      */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/hero-background.webp')`, // <--- RENAME YOUR IMAGE TO THIS
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1, // Very subtle, barely visible
          filter: 'grayscale(100%) contrast(1.2)', // Remove color, boost contrast
          zIndex: 0,
        }}
      />

      {/* LAYER 2: THE VIGNETTE (Focus Creator) */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, transparent 0%, ${theme.palette.background.default} 90%)`,
          zIndex: 1,
        }}
      />

      {/* LAYER 3: THE AMBER ENERGY (Bottom Glow) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '500px',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, transparent 70%)`,
          filter: 'blur(100px)',
          zIndex: 1,
        }}
      />

      {/* LAYER 4: THE CONTENT */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <AnimatedSection>
          
          {/* Trust Badge */}
          <Fade in={true} timeout={1000}>
            <Chip 
              icon={<AutoAwesomeIcon sx={{ fontSize: '16px !important', color: theme.palette.secondary.main }} />}
              label="New: 0% Commission Engine" 
              sx={{ 
                mb: 4, 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 20px ${theme.palette.secondary.main}20` // Subtle amber glow on badge
              }} 
            />
          </Fade>

          {/* Headline */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '2.8rem', md: '5rem' },
              lineHeight: 1.1,
              mb: 3,
              color: 'white',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase', // "Command" style
            }}
          >
            {t('title_part1')}
            <br />
            {/* The Gradient Text */}
            <Box
              component="span"
              sx={{
                background: `linear-gradient(135deg, white 0%, ${theme.palette.secondary.main} 100%)`, // White to Amber
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('title_part2')}
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 6,
              maxWidth: '650px',
              mx: 'auto',
              fontWeight: 300,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.6,
            }}
          >
            {t('subtitle')}
          </Typography>

          {/* CTA Button */}
          <Button
            component={Link}
            href="#pricing"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              fontSize: '1.1rem',
              py: 2,
              px: 6,
              borderRadius: '50px',
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 700,
              boxShadow: `0 0 30px ${theme.palette.secondary.main}50`, // Strong Amber Glow
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px) scale(1.02)',
                boxShadow: `0 0 50px ${theme.palette.secondary.main}70`,
              },
            }}
          >
            {t('ctaButton')}
          </Button>

          {/* Trust Signal */}
          <Typography 
            variant="caption" 
            display="block" 
            sx={{ 
              mt: 6, 
              color: 'text.disabled', 
              letterSpacing: 1, 
              textTransform: 'uppercase', 
              fontSize: '0.75rem' 
            }}
          >
            {t('trustLabel')}
          </Typography>

        </AnimatedSection>
      </Container>
    </Box>
  );
}