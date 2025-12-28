import React from 'react';
import { Paper, Box, Typography, useTheme } from '@mui/material';

interface BentoCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  colSpan?: number; // For grid logic later
}

const BentoCard: React.FC<BentoCardProps> = ({ children, title, subtitle }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        p: 4,
        position: 'relative',
        overflow: 'hidden',
        // The "Obsidian" Style Rules:
        backgroundColor: '#0A0A0A', 
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: 4,
        background: `linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)`, // Subtle top light
        transition: 'all 0.3s ease',
        '&:hover': {
           borderColor: 'rgba(255, 255, 255, 0.2)',
           boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)', // Deep shadow
           transform: 'translateY(-2px)',
        },
        // The "Top Highlight" Border Trick
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }
      }}
    >
      {/* Optional Header */}
      {(title || subtitle) && (
        <Box sx={{ mb: 3 }}>
          {title && (
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      )}
      
      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Paper>
  );
};

export default BentoCard;