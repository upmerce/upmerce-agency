// src/components/sections/OwnershipSection.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, Paper, useTheme, Stack, Chip } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StorageIcon from '@mui/icons-material/Storage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function OwnershipSection({ id }: { id?: string }) {
  const t = useTranslations('AgencyOwnership');
  const theme = useTheme();

  // We map the 4 translation items to specific icons for a richer look
  const items = [
    { text: t('item1'), icon: <GavelIcon fontSize="small" /> }, // IP Rights
    { text: t('item2'), icon: <VpnKeyIcon fontSize="small" /> }, // Admin Access
    { text: t('item3'), icon: <StorageIcon fontSize="small" /> }, // Database
    { text: t('item4'), icon: <CheckCircleIcon fontSize="small" /> }, // No monthly fees
  ];

  return (
    <Box
      id={id || "ownership"}
      component="section"
      aria-labelledby="ownership-heading"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default, // Obsidian
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          
          {/* LEFT: The Argument (Stop Renting) */}
          <Grid size={{xs: 12, md: 6}}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: theme.palette.secondary.main, 
                letterSpacing: 2, 
                fontWeight: 700, 
                mb: 1, 
                display: 'block' 
              }}
            >
              {t('overline')}
            </Typography>
            <Typography
              id="ownership-heading"
              variant="h3"
              sx={{
                fontWeight: 800,
                color: 'white',
                mb: 3,
                lineHeight: 1.1
              }}
            >
              {t('title')}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary', 
                fontWeight: 400, 
                lineHeight: 1.6,
                mb: 4
              }}
            >
              {t('subtitle')}
            </Typography>

            {/* "Rent vs Own" Comparison (Text) */}
            <Stack direction="row" spacing={4}>
              <Box>
                <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  {t('comparison.othersTitle')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('comparison.othersPoint1')} <br/>
                  {t('comparison.othersPoint2')} <br/>
                  {t('comparison.othersPoint3')}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 700, display: 'block', mb: 0.5 }}>
                  {t('comparison.upmerceTitle')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                   {t('comparison.upmercePoint1')} <br/>
                   {t('comparison.upmercePoint2')} <br/>
                   {t('comparison.upmercePoint3')}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT: The "Digital Deed" Card */}
          <Grid size={{xs: 12, md: 6}}>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                // "Secure Vault" Look
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: `1px solid ${theme.palette.secondary.main}40`, // Amber Border
                boxShadow: `0 0 40px -10px ${theme.palette.secondary.main}15`,
                overflow: 'hidden'
              }}
            >
              {/* Decorative "Verified" Stamp */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: -20, 
                  right: -20, 
                  width: 100, 
                  height: 100, 
                  borderRadius: '50%', 
                  border: `8px solid ${theme.palette.secondary.main}10`,
                }} 
              />

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
                  {t('card.transferTitle')}
                </Typography>
                <Chip 
                  label={t('card.verifiedBadge')}
                  size="small"
                  sx={{ 
                    bgcolor: '#10B981', 
                    color: 'black', 
                    fontWeight: 800,
                    fontSize: '0.7rem'
                  }} 
                />
              </Box>

              <Stack spacing={3}>
                {items.map((item, index) => (
                  <Paper
                    key={index}
                    elevation={0}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 2
                    }}
                  >
                    <Box sx={{ color: theme.palette.secondary.main }}>
                      {item.icon}
                    </Box>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {item.text}
                    </Typography>
                  </Paper>
                ))}
              </Stack>

              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  mt: 4, 
                  textAlign: 'center', 
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'monospace'
                }}
              >
                {t('card.licenseId')}
              </Typography>

            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}