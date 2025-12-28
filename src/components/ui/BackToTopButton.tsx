// src/components/ui/BackToTopButton.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Fab, Zoom, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function BackToTopButton() {
  const t = useTranslations('Common'); // Ensure you have a 'backToTop' key in Common.json
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    // Show button after scrolling down 300px
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        left: 32, // Moved to Bottom-Left to balance the Social Menu on the Right
        zIndex: 90, // Lower than the Social Menu (9999) but above content
      }}
    >
      <Zoom in={isVisible}>
        <Fab
          onClick={scrollToTop}
          size="small"
          aria-label={t('backToTop')}
          sx={{
            backgroundColor: 'rgba(20, 20, 20, 0.8)', // Obsidian Glass
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: theme.palette.secondary.main, // Amber on hover
              color: 'black',
              transform: 'translateY(-3px)',
              boxShadow: `0 0 15px ${theme.palette.secondary.main}60`
            }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
}