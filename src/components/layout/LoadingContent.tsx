// src/components/layout/LoadingContent.tsx
'use client';

import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
//import { useTranslations } from 'next-intl';

export default function LoadingContent() {
 // const t = useTranslations('Loading');

  return (
    <Box 
      sx={{ 
        height: '100vh',
        width: '100vw',
        backgroundColor: '#030303', // Obsidian
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* 1. Outer "Chassis" Ring (Subtle) */}
        <CircularProgress 
          size={80}
          thickness={1}
          sx={{ 
            color: 'rgba(255,255,255,0.1)',
            position: 'absolute'
          }} 
        />
        
        {/* 2. Inner "Energy" Ring (Amber Glow) */}
        <CircularProgress 
          size={80}
          thickness={2}
          sx={{ 
            color: '#D97706', // Brand Amber
            animationDuration: '1s',
            position: 'absolute',
            left: 0,
            filter: 'drop-shadow(0 0 10px rgba(217, 119, 6, 0.5))', // The Glow
            [`& .MuiCircularProgress-circle`]: {
              strokeLinecap: 'round',
            },
          }} 
        />
      </Box>

      {/* 3. The Status Text */}
      <Typography 
        variant="overline" 
        sx={{ 
          mt: 4, 
          color: 'rgba(255,255,255,0.5)', 
          letterSpacing: 4, 
          fontWeight: 600,
          fontSize: '0.75rem',
          animation: 'pulse 1.5s infinite ease-in-out'
        }}
      >
        INITIALIZING SYSTEM...
      </Typography>

      {/* CSS Animation for Pulse */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>
    </Box>
  );
}