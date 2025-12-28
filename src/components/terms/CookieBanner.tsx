// src/components/layout/CookieBanner.tsx
'use client';

import { useTranslations } from "next-intl";
import { Link } from '@/i18n/navigation'; 
import { Box, Button, Container, Paper, Typography, useTheme, Slide, Stack } from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';

type Props = {
  onAcceptAll: () => void;
  onDeclineAll: () => void;
  onCustomize: () => void;
};

export default function CookieBanner({ onAcceptAll, onDeclineAll, onCustomize }: Props) {
  const t = useTranslations("CookieConsent");
  const theme = useTheme();

  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <Paper
        elevation={24}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300, // Above everything
          borderRadius: 0, 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          // Obsidian Glass
          backgroundColor: 'rgba(10, 10, 10, 0.95)', 
          backdropFilter: 'blur(10px)',
          p: 3
        }}
      >
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={3}>
            
            {/* Icon & Text */}
            <Box sx={{ flex: 1, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
               <Box sx={{ 
                 p: 1, 
                 bgcolor: 'rgba(255,255,255,0.05)', 
                 borderRadius: '50%', 
                 display: {xs: 'none', sm: 'block'} 
               }}>
                  <CookieIcon sx={{ color: theme.palette.secondary.main }} />
               </Box>
               <Box>
                  <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
                    {t('message')} 
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    We use tracking to improve your experience. Read our{' '}
                    <Link href="/privacy" style={{ color: theme.palette.secondary.main, textDecoration: 'none' }}>
                      {t('privacyLinkText')}
                    </Link>.
                  </Typography>
               </Box>
            </Box>

            {/* Actions */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
               <Button
                onClick={onAcceptAll}
                variant="contained"
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: 'black',
                  fontWeight: 700,
                  px: 3,
                  '&:hover': { bgcolor: '#fbbf24' }
                }}
              >
                {t('acceptAll')}
              </Button>
              <Button
                onClick={onDeclineAll}
                variant="outlined"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.2)',
                  px: 3,
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                {t('declineAll')}
              </Button>
              <Button
                onClick={onCustomize}
                sx={{ color: 'text.secondary', '&:hover': { color: 'white' } }}
              >
                {t('customize')}
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Paper>
    </Slide>
  );
}