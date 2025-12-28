// src/components/sections/ProblemSolutionSection.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, Paper, useTheme, Stack } from '@mui/material';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SpeedIcon from '@mui/icons-material/Speed';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Map icons to the problems
const problemIcons = [MoneyOffIcon, SpeedIcon, WhatsAppIcon];

export default function ProblemSolutionSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyProblemSolution');
  const theme = useTheme();

  const problems = [0, 1, 2].map(index => ({
    title: t(`problems.${index}.title`),
    description: t(`problems.${index}.description`),
    Icon: problemIcons[index],
  }));

  return (
    <Box
      id={id || "problem-solution"}
      component="section"
      aria-labelledby="problem-solution-heading"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default, // Obsidian
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decor: Subtle Red Glow behind the "Pain" area */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          
          {/* LEFT: THE PAIN (Warning Cards) */}
          <Grid  size={{xs: 12, md: 6}}>
            <Typography
              variant="h3"
              id="problem-solution-heading"
              sx={{
                mb: 4,
                fontWeight: 800,
                // Gradient Text for "The OTAs Are Getting Rich"
                background: 'linear-gradient(90deg, #fff 0%, #999 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('problemTitle')}
            </Typography>

            <Stack spacing={3}>
              {problems.map((problem, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', // Very subtle glass
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(239, 68, 68, 0.3)', // Red border on hover (Warning)
                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: index === 0 ? '#ef4444' : '#fff', // First icon Red (Money Loss)
                    }}
                  >
                    <problem.Icon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#fff' }}>
                      {problem.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {problem.description}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* RIGHT: THE SOLUTION (The Glowing Amber Card) */}
          <Grid  size={{xs: 12, md: 6}}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                height: '100%',
                borderRadius: 5,
                position: 'relative',
                overflow: 'hidden',
                // The "Golden Ticket" Look
                background: `linear-gradient(135deg, ${theme.palette.secondary.main}15 0%, rgba(0,0,0,0) 100%)`,
                border: `1px solid ${theme.palette.secondary.main}30`,
                boxShadow: `0 20px 80px -20px ${theme.palette.secondary.main}20`, // Amber Glow
              }}
            >
              {/* Decorative "Circuit" lines */}
              <Box sx={{ position: 'absolute', top: 0, right: 0, p: 3, opacity: 0.2 }}>
                <AutoAwesomeIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />
              </Box>

              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontWeight: 800,
                  color: theme.palette.secondary.main, // Amber Text
                  mb: 3,
                  letterSpacing: '-0.02em',
                }}
              >
                {t('solutionTitle')}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: 'text.primary',
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  opacity: 0.9,
                }}
              >
                {t('solutionText')}
              </Typography>
              
              {/* Visual Divider */}
              <Box sx={{ width: '40px', height: '4px', bgcolor: theme.palette.secondary.main, mt: 4, borderRadius: 2 }} />
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}