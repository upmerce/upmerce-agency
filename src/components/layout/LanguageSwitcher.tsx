// src/components/layout/LanguageSwitcher.tsx
'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { Box, IconButton, Typography, Paper, Fade, useTheme, ClickAwayListener, Stack } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const languageNames: { [key: string]: string } = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية',
  };

  const onSelectLocale = (nextLocale: string) => {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
      setIsOpen(false);
    });
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Box sx={{ position: 'relative', display: 'inline-block' }}>
        
        {/* 1. The Trigger (Globe Icon) */}
        <IconButton
          ref={anchorRef}
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
          aria-label="Select language"
          aria-expanded={isOpen}
          sx={{
            color: isOpen ? theme.palette.secondary.main : 'rgba(255,255,255,0.7)',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: theme.palette.secondary.main, // Amber hover
              backgroundColor: 'rgba(255,255,255,0.05)',
              transform: 'rotate(15deg)' // Subtle interaction
            }
          }}
        >
          <LanguageIcon />
        </IconButton>

        {/* 2. The Glass Menu */}
        <Fade in={isOpen}>
          <Paper
            elevation={24}
            sx={{
              position: 'absolute',
              top: '120%',
              right: 0, // Align right for LTR, logic handles RTL implicitly via text-align
              minWidth: '160px',
              zIndex: 50,
              borderRadius: 3,
              overflow: 'hidden',
              // Obsidian Glass Look
              backgroundColor: 'rgba(20, 20, 20, 0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.8)'
            }}
          >
            <Stack py={1}>
              {Object.entries(languageNames).map(([code, name]) => {
                const isActive = code === locale;
                
                return (
                  <Box
                    key={code}
                    component="button"
                    onClick={() => onSelectLocale(code)}
                    disabled={isPending}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      px: 2.5,
                      py: 1.5,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? 'white' : 'text.secondary',
                        fontFamily: code === 'ar' ? 'sans-serif' : 'inherit' // Ensure Arabic font renders well
                      }}
                    >
                      {name}
                    </Typography>
                    
                    {/* Active Indicator (Amber Dot or Check) */}
                    {isActive && (
                      <CheckIcon sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Paper>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
}