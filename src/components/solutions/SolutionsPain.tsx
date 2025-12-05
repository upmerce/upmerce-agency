// /src/components/solutions/SolutionsPain.tsx
'use client';
import React from 'react';
import { Box, Container, Grid, Typography, Paper, Stack, useTheme } from '@mui/material';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BrokenImage from '@mui/icons-material/BrokenImage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import LinkIcon from '@mui/icons-material/Link';
import { useTranslations } from 'next-intl';

const SolutionsPain = () => {
  const t = useTranslations('Solutions.Pain');
  const theme = useTheme();

  const painPoints = [
    { icon: <MoneyOffIcon color="error" />, titleKey: "painPoints.commission.title", descKey: "painPoints.commission.desc" },
    { icon: <WhatsAppIcon color="warning" />, titleKey: "painPoints.whatsapp.title", descKey: "painPoints.whatsapp.desc" },
    { icon: <BrokenImage color="error" />, titleKey: "painPoints.invisible.title", descKey: "painPoints.invisible.desc" },
  ];

  const solutionPoints = [
    { icon: <AttachMoneyIcon color="success" />, titleKey: "solutionPoints.profit.title", descKey: "solutionPoints.profit.desc" },
    { icon: <AutoModeIcon color="primary" />, titleKey: "solutionPoints.automation.title", descKey: "solutionPoints.automation.desc" },
    { icon: <LinkIcon color="primary" />, titleKey: "solutionPoints.presence.title", descKey: "solutionPoints.presence.desc" },
  ];

  return (
    // ▼▼▼ UPDATED Main Background to dark gray ▼▼▼
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.900', color: 'common.white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
           <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            {t('sectionTitle')}
          </Typography>
          <Typography 
            variant="h3" 
            fontWeight={800}
            sx={{ whiteSpace: 'pre-wrap' }}
          >
            {t('headline')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* The Old Way (Pain) - Dark Red Theme */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={4} sx={{ 
              p: 4, height: '100%', borderRadius: 4, 
              // ▼▼▼ UPDATED CARD COLORS ▼▼▼
              bgcolor: 'rgba(211, 47, 47, 0.1)', // Dark red tint
              border: `1px solid ${theme.palette.error.dark}`,
              color: 'common.white'
            }}>
              <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: theme.palette.error.main, mb: 4 }}>
                {t('painColumnTitle')}
              </Typography>
              <Stack spacing={4}>
                {painPoints.map((item, index) => (
                  <Stack key={index} direction="row" spacing={3} alignItems="flex-start">
                    {/* Darker icon background */}
                    <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: 'grey.800', boxShadow: 2 }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>{t(item.titleKey)}</Typography>
                      {/* Lighter gray text */}
                      <Typography variant="body1" color="grey.300">{t(item.descKey)}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* The New Way (Solution) - Dark Blue Theme */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={10} sx={{ 
              p: 4, height: '100%', borderRadius: 4, 
              // ▼▼▼ UPDATED CARD COLORS ▼▼▼
              bgcolor: 'rgba(25, 118, 210, 0.1)', // Dark blue tint
              border: `1px solid ${theme.palette.primary.dark}`, 
              position: 'relative', overflow: 'hidden',
              color: 'common.white'
            }}>
               <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, bgcolor: theme.palette.primary.main, opacity: 0.1, borderRadius: '50%' }} />
               
              <Typography variant="h4" fontWeight={800} gutterBottom sx={{ color: theme.palette.primary.main, mb: 4 }}>
                {t('solutionColumnTitle')}
              </Typography>
              <Stack spacing={4}>
                {solutionPoints.map((item, index) => (
                  <Stack key={index} direction="row" spacing={3} alignItems="flex-start">
                     {/* Darker icon background */}
                    <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: 'grey.800', boxShadow: 2 }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>{t(item.titleKey)}</Typography>
                      {/* Lighter gray text */}
                      <Typography variant="body1" color="grey.300">{t(item.descKey)}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SolutionsPain;