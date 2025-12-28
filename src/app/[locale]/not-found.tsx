// src/app/[locale]/not-found.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar'; // "Scanning" feel
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Note: not-found.tsx in app router is a Server Component by default, 
// but we use 'use client' for the router/navigation features if needed 
// or for MUI interactivity. Here it's static enough, but 'use client' is safe.

export default function NotFound() {
  return (
    <Box 
      component="main"
      sx={{ 
        minHeight: '100vh',
        backgroundColor: '#030303', // Obsidian
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 1. Background Visuals (The "Void") */}
      <Box sx={{ 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', 
        background: 'radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, transparent 70%)',
        filter: 'blur(100px)', zIndex: 0 
      }} />

      {/* Grid Pattern Overlay */}
      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.1, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        
        {/* 2. The Status Chip */}
        <Chip 
          icon={<RadarIcon sx={{ fontSize: '16px !important', color: '#ef4444 !important' }} />} // Red scanning icon
          label="SIGNAL LOST" 
          sx={{ 
            mb: 4, 
            bgcolor: 'rgba(239, 68, 68, 0.1)', // Red Tint
            color: '#ef4444', 
            fontWeight: 700, 
            letterSpacing: 2,
            border: '1px solid rgba(239, 68, 68, 0.2)',
            animation: 'pulse 2s infinite'
          }} 
        />
        
        {/* 3. The Glitch Title */}
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '6rem', md: '10rem' }, 
            fontWeight: 900, 
            color: 'white', 
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            mb: 2,
            textShadow: '0 0 30px rgba(255,255,255,0.1)',
            opacity: 0.9
          }}
        >
          404
        </Typography>

        <Typography 
          variant="h4" 
          sx={{ 
            color: 'white', 
            fontWeight: 700, 
            mb: 2 
          }}
        >
          Coordinates Empty
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary', 
            mb: 6, 
            maxWidth: '400px', 
            mx: 'auto' 
          }}
        >
          The page you are looking for has been moved, deleted, or never existed in this timeline.
        </Typography>

        {/* 4. Action Buttons */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
        >
          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              bgcolor: 'white',
              color: 'black',
              borderRadius: '50px',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              '&:hover': { bgcolor: '#f5f5f5', transform: 'translateY(-2px)' }
            }}
          >
            Return to Base
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '50px',
              fontWeight: 600,
              px: 4,
              py: 1.5,
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' }
            }}
          >
            Go Back
          </Button>
        </Stack>

      </Container>
      
      {/* CSS Animation for Pulse */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
}