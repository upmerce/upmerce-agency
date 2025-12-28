// src/components/sections/TechnologyAdvantageSection.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, Paper, useTheme, Stack, Chip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StorageIcon from '@mui/icons-material/Storage'; // Represents "Old Server"
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; // Represents "Next.js"

export default function TechnologyAdvantageSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyTechnology');
  const theme = useTheme();

  return (
    <Box
      id={id || "technology-advantage"}
      component="section"
      aria-labelledby="technology-advantage-heading"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default, // Obsidian
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          <Typography
            variant="overline"
            sx={{ 
              color: 'text.secondary', 
              letterSpacing: 3, 
              fontWeight: 700,
              display: 'block',
              mb: 1
            }}
          >
            THE INFRASTRUCTURE GAP
          </Typography>
          <Typography
            id="technology-advantage-heading"
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'white',
              mb: 2,
            }}
          >
            {t('title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
            {t('subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          
          {/* LEFT: THE OLD WAY (Legacy/Obsolete) */}
          <Grid  size={{xs: 12, md: 6}}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                borderRadius: 4,
                // "Legacy" Look: Dark, Dim, Red Warning
                backgroundColor: 'rgba(20, 0, 0, 0.3)', 
                border: '1px solid rgba(239, 68, 68, 0.2)', // Red Border
                opacity: 0.8,
                transition: 'opacity 0.3s ease',
                '&:hover': { opacity: 1 }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box sx={{ 
                  p: 1.5, borderRadius: 2, 
                  bgcolor: 'rgba(239, 68, 68, 0.1)', 
                  color: '#ef4444', 
                  mr: 2 
                }}>
                  <StorageIcon />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#ef4444' }}>
                    {t('oldWay.title')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Legacy Architecture
                  </Typography>
                </Box>
              </Box>

              <Stack spacing={3}>
                {['performance', 'security', 'cost'].map((key) => (
                  <Box key={key} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <CancelIcon sx={{ color: '#ef4444', mr: 2, mt: 0.5, fontSize: 20 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        {t(`labels.${key}`)}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        {t(`oldWay.${key}`)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* RIGHT: THE NEW WAY (Premium/Future) */}
          <Grid  size={{xs: 12, md: 6}}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                borderRadius: 4,
                position: 'relative',
                overflow: 'hidden',
                // "Future" Look: Glass, Amber Glow, High Contrast
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${theme.palette.secondary.main}60`, // Amber Border
                boxShadow: `0 0 40px -10px ${theme.palette.secondary.main}20`,
              }}
            >
              {/* "WINNER" Badge */}
              <Chip 
                label="RECOMMENDED" 
                size="small" 
                sx={{ 
                  position: 'absolute', top: 20, right: 20, 
                  bgcolor: theme.palette.secondary.main, 
                  color: 'black', 
                  fontWeight: 700 
                }} 
              />

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box sx={{ 
                  p: 1.5, borderRadius: 2, 
                  bgcolor: `${theme.palette.secondary.main}20`, 
                  color: theme.palette.secondary.main, 
                  mr: 2 
                }}>
                  <RocketLaunchIcon />
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
                    {t('newWay.title')}
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.secondary.main, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Modern Edge Network
                  </Typography>
                </Box>
              </Box>

              <Stack spacing={3}>
                {['performance', 'security', 'cost'].map((key) => (
                  <Box key={key} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <CheckCircleIcon sx={{ color: '#10B981', mr: 2, mt: 0.5, fontSize: 20 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: theme.palette.secondary.main, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 1 }}>
                        {t(`labels.${key}`)}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                        {t(`newWay.${key}`)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}