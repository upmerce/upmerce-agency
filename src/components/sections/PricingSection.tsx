// src/components/sections/PricingSection.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, Button, useTheme, Chip, Stack, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link } from '@/i18n/navigation';

export default function PricingSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyPricing');
  const theme = useTheme();

  const packages = [0, 1, 2]; // Indices for your 3 plans

  return (
    <Box
      id={id || "pricing"}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decor: Amber Glow behind the Pricing Area */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '600px',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}08 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '700px', mx: 'auto' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: 'white',
            }}
          >
            {t('title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
            {t('subtitle')}
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={4} alignItems="center">
          {packages.map((index) => {
            // Retrieve data
            const name = t(`packages.${index}.name`);
            const price = t(`packages.${index}.price`);
            const description = t(`packages.${index}.description`);
            const features = t.raw(`packages.${index}.features`) as string[];
            const isPopular = index === 1; // Middle plan is the "Hero"

            return (
              <Grid  key={index} size={{xs: 12, md: 4}}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    position: 'relative',
                    // Logic for the "Popular" Card vs others
                    transform: isPopular ? { md: 'scale(1.05)' } : 'none',
                    zIndex: isPopular ? 2 : 1,
                    backgroundColor: isPopular ? '#121212' : 'rgba(255,255,255,0.02)',
                    border: isPopular 
                      ? `1px solid ${theme.palette.secondary.main}` 
                      : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 4,
                    boxShadow: isPopular 
                      ? `0 0 40px -10px ${theme.palette.secondary.main}30` // Amber Glow
                      : 'none',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {/* "Best ROI" Badge for Popular Plan */}
                  {isPopular && (
                    <Chip
                      icon={<AutoAwesomeIcon sx={{ fontSize: '16px !important', color: 'black !important' }} />}
                      label={t('popular')}
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: theme.palette.secondary.main,
                        color: 'black',
                        fontWeight: 700,
                        border: '1px solid white',
                      }}
                    />
                  )}

                  {/* Plan Name & Price */}
                  <Typography variant="overline" sx={{ color: isPopular ? theme.palette.secondary.main : 'text.secondary', fontWeight: 700, letterSpacing: 1 }}>
                    {name}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mt: 1, mb: 2 }}>
                    {price}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, minHeight: '60px' }}>
                    {description}
                  </Typography>

                  {/* CTA Button */}
                  <Button
                    fullWidth
                    component={Link}
                    href="#contact"
                    variant={isPopular ? 'contained' : 'outlined'}
                    color={isPopular ? 'secondary' : 'primary'}
                    size="large"
                    sx={{
                      mb: 4,
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: 3,
                      // Specific styling for the popular button to make it pop
                      ...(isPopular && {
                        backgroundColor: 'white',
                        color: 'black',
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                        }
                      })
                    }}
                  >
                    {t(`packages.${index}.cta`)}
                  </Button>

                  {/* Features List */}
                  <Stack spacing={2}>
                    {features.map((feature, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                        <CheckCircleIcon 
                          sx={{ 
                            fontSize: 20, 
                            color: isPopular ? theme.palette.secondary.main : 'rgba(255,255,255,0.3)',
                            mt: 0.3 
                          }} 
                        />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>

                  {/* ROI Note */}
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      display: 'block', 
                      mt: 4, 
                      textAlign: 'center', 
                      color: 'text.disabled',
                      fontStyle: 'italic' 
                    }}
                  >
                    {t(`packages.${index}.note`)}
                  </Typography>

                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}