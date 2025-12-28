// src/components/solutions/SolutionsPain.tsx
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
    { icon: <MoneyOffIcon sx={{ color: '#ef4444' }} />, titleKey: "painPoints.commission.title", descKey: "painPoints.commission.desc" },
    { icon: <WhatsAppIcon sx={{ color: '#f59e0b' }} />, titleKey: "painPoints.whatsapp.title", descKey: "painPoints.whatsapp.desc" },
    { icon: <BrokenImage sx={{ color: '#ef4444' }} />, titleKey: "painPoints.invisible.title", descKey: "painPoints.invisible.desc" },
  ];

  const solutionPoints = [
    { icon: <AttachMoneyIcon sx={{ color: '#10b981' }} />, titleKey: "solutionPoints.profit.title", descKey: "solutionPoints.profit.desc" },
    { icon: <AutoModeIcon sx={{ color: '#38bdf8' }} />, titleKey: "solutionPoints.automation.title", descKey: "solutionPoints.automation.desc" },
    { icon: <LinkIcon sx={{ color: theme.palette.secondary.main }} />, titleKey: "solutionPoints.presence.title", descKey: "solutionPoints.presence.desc" },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: theme.palette.background.default, position: 'relative' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
           <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2, fontWeight: 700 }}>
            {t('sectionTitle')}
          </Typography>
          <Typography variant="h3" fontWeight={800} sx={{ color: 'white', mt: 1 }}>
            {t('headline')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          
          {/* THE OLD WAY (Critical Error) */}
          <Grid  size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ 
              p: 5, height: '100%', borderRadius: 4, 
              bgcolor: 'rgba(239, 68, 68, 0.05)', 
              border: '1px solid rgba(239, 68, 68, 0.2)',
              transition: 'all 0.3s',
              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.08)' }
            }}>
              <Typography variant="h4" fontWeight={800} sx={{ color: '#ef4444', mb: 4, letterSpacing: '-0.02em' }}>
                {t('painColumnTitle')}
              </Typography>
              <Stack spacing={4}>
                {painPoints.map((item, index) => (
                  <Stack key={index} direction="row" spacing={3} alignItems="flex-start">
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(239, 68, 68, 0.1)' }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>{t(item.titleKey)}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{t(item.descKey)}</Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* THE NEW WAY (System Optimized) */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={{ 
              p: 5, height: '100%', borderRadius: 4, 
              bgcolor: 'rgba(255, 255, 255, 0.03)', 
              border: `1px solid ${theme.palette.secondary.main}50`, 
              boxShadow: `0 0 40px -10px ${theme.palette.secondary.main}20`,
              position: 'relative', overflow: 'hidden'
            }}>
              {/* Glow Effect */}
              <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: `radial-gradient(circle, ${theme.palette.secondary.main}20 0%, transparent 70%)` }} />
               
              <Typography variant="h4" fontWeight={800} sx={{ color: 'white', mb: 4, letterSpacing: '-0.02em' }}>
                {t('solutionColumnTitle')}
              </Typography>
              <Stack spacing={4}>
                {solutionPoints.map((item, index) => (
                  <Stack key={index} direction="row" spacing={3} alignItems="flex-start">
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>{item.icon}</Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: 'white' }}>{t(item.titleKey)}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{t(item.descKey)}</Typography>
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