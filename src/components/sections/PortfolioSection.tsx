// src/components/sections/PortfolioSection.tsx
'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Box, Container, Grid, Typography, Button, useTheme, Chip, Paper, Fade } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function PortfolioSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyPortfolio');
  const theme = useTheme();
  const [activeId, setActiveId] = useState('marrago');

  // We define the themes INSIDE the component to access translations
  const themes = [
    {
      id: 'marrago',
      name: t('themes.marrago.name'),
      category: t('themes.marrago.category'),
      status: 'LIVE', // Technical status flag (keep as is for logic)
      url: 'https://marrago.com',
      desktopImg: '/images/themes/default-pc.webp',
      mobileImg: '/images/themes/default-mobile.webp',
      description: t('themes.marrago.description')
    },
    {
      id: 'luxury',
      name: t('themes.luxury.name'),
      category: t('themes.luxury.category'),
      status: 'CONCEPT',
      url: '#',
      desktopImg: '/images/themes/luxury-pc.webp',
      mobileImg: '/images/themes/luxury-mobile.webp',
      description: t('themes.luxury.description')
    },
    {
      id: 'adventure',
      name: t('themes.adventure.name'),
      category: t('themes.adventure.category'),
      status: 'CONCEPT',
      url: '#',
      desktopImg: '/images/themes/adventure-pc.webp',
      mobileImg: '/images/themes/adventure-mobile.webp',
      description: t('themes.adventure.description')
    },
  ];

  const activeTheme = themes.find(t => t.id === activeId) || themes[0];

  return (
    <Box
      id={id || "portfolio"}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: theme.palette.secondary.main, letterSpacing: 2, fontWeight: 700 }}>
            {t('overline')}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 2 }}>
            {t('title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
            {t('subtitle')}
          </Typography>
        </Box>

        {/* Tab Selection */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 8, flexWrap: 'wrap' }}>
          {themes.map((themeItem) => (
            <Button
              key={themeItem.id}
              onClick={() => setActiveId(themeItem.id)}
              variant={activeId === themeItem.id ? 'contained' : 'outlined'}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1,
                borderColor: activeId === themeItem.id ? 'transparent' : 'rgba(255,255,255,0.2)',
                backgroundColor: activeId === themeItem.id ? 'white' : 'transparent',
                color: activeId === themeItem.id ? 'black' : 'text.secondary',
                '&:hover': {
                  backgroundColor: activeId === themeItem.id ? '#f0f0f0' : 'rgba(255,255,255,0.05)',
                  borderColor: 'white'
                }
              }}
            >
              {themeItem.name}
              {themeItem.status === 'LIVE' && (
                <Box 
                  component="span" 
                  sx={{ 
                    ml: 1.5, 
                    width: 8, 
                    height: 8, 
                    bgcolor: '#10B981', 
                    borderRadius: '50%', 
                    boxShadow: '0 0 10px #10B981' 
                  }} 
                />
              )}
            </Button>
          ))}
        </Box>

        {/* The Showcase (Laptop + Phone Mockup) */}
        <Grid container spacing={8} alignItems="center">
          
          {/* LEFT: The Description */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Fade in={true} key={activeTheme.id} timeout={500}>
              <Box>
                <Chip 
                  label={activeTheme.category} 
                  size="small" 
                  sx={{ 
                    mb: 3, 
                    bgcolor: 'rgba(255,255,255,0.1)', 
                    color: 'white', 
                    border: '1px solid rgba(255,255,255,0.2)' 
                  }} 
                />
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'white', mb: 2 }}>
                  {activeTheme.name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7, fontSize: '1.1rem' }}>
                  {activeTheme.description}
                </Typography>
                
                <Button
                  component={Link}
                  href={activeTheme.url}
                  target="_blank"
                  endIcon={<ArrowOutwardIcon />}
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled={activeTheme.status === 'CONCEPT'}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    boxShadow: `0 0 20px ${theme.palette.secondary.main}40`,
                  }}
                >
                  {activeTheme.status === 'LIVE' ? t('visitButton') : t('comingSoon')}
                </Button>
              </Box>
            </Fade>
          </Grid>

          {/* RIGHT: The Device Mockups */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ position: 'relative', height: '400px', width: '100%' }}>
              
              {/* Laptop Mockup */}
              <Paper
                elevation={24}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: { xs: 0, md: 40 },
                  width: '90%',
                  height: '300px',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  bgcolor: '#000',
                }}
              >
                 <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src={activeTheme.desktopImg}
                      alt={`${activeTheme.name} Desktop View`}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                 </Box>
              </Paper>

              {/* Mobile Mockup (Floating) */}
              <Paper
                elevation={24}
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: { xs: 20, md: 0 },
                  width: '120px',
                  height: '240px',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '4px solid #1f1f1f',
                  bgcolor: '#000',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  zIndex: 2,
                }}
              >
                 <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src={activeTheme.mobileImg}
                      alt={`${activeTheme.name} Mobile View`}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top' }}
                    />
                 </Box>
              </Paper>

            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}