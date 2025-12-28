// src/components/about/AboutStory.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, useTheme, Fade } from '@mui/material';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const AboutStory = () => {
  const t = useTranslations('About.Story');
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 15 }, 
        backgroundColor: theme.palette.background.default, // Obsidian
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 8, md: 12 }} alignItems="center">
          
          {/* Left Column: The Narrative */}
          <Grid  size={{xs: 12, md: 6}}>
            <Fade in={true} timeout={800}>
              <Box>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: theme.palette.secondary.main, 
                    fontWeight: 700, 
                    letterSpacing: 3,
                    mb: 2,
                    display: 'block'
                  }}
                >
                  {t('sectionTitle')}
                </Typography>
                
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontSize: { xs: '2rem', md: '3rem' },
                    fontWeight: 800,
                    mb: 4,
                    lineHeight: 1.1,
                    color: 'white',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {t('headline')}
                </Typography>

                <Box sx={{ borderLeft: `2px solid ${theme.palette.secondary.main}`, pl: 4, mb: 4 }}>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.8 }}>
                    {t.rich('p1', {
                      bold: (chunks) => <Box component="span" sx={{ color: 'white', fontWeight: 600 }}>{chunks}</Box>
                    })}
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                   {t('p2')}
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mt: 4, 
                    color: 'white', 
                    fontFamily: 'serif', 
                    fontStyle: 'italic',
                    fontSize: '1.5rem'
                  }}
                >
                   &ldquo;{t('p3')}&rdquo;
                </Typography>
              </Box>
            </Fade>
          </Grid>

          {/* Right Column: The Cinematic Visual */}
          <Grid size={{xs: 12, md: 6}}>
            <Box 
              sx={{ 
                position: 'relative', 
                height: { xs: '400px', md: '600px' },
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
                // The "Obsidian" Frame
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `0 20px 80px -20px rgba(0,0,0,0.7)`,
              }}
            >
              {/* Image Overlay Gradient for depth */}
              <Box 
                sx={{ 
                  position: 'absolute', inset: 0, zIndex: 1, 
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)' 
                }} 
              />
              
              <Image
                src="/images/about/story-gap.webp"
                alt="Moroccan Hospitality"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Decorative "Label" on image */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: 30, 
                  left: 30, 
                  zIndex: 2,
                  border: '1px solid rgba(255,255,255,0.3)',
                  px: 2, py: 0.5,
                  backdropFilter: 'blur(4px)'
                }}
              >
                <Typography variant="caption" sx={{ color: 'white', letterSpacing: 2, fontWeight: 700 }}>
                  THE DIGITAL GAP • 2024
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutStory;