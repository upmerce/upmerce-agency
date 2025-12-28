// src/components/ui/FloatingSocialMenu.tsx
'use client';

import React, { useState } from 'react';
import { Box, Fab, Tooltip, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { contactConfig } from '@/config/site';
import { useTranslations } from 'next-intl';

export default function FloatingSocialMenu() {
  const t = useTranslations('AgencyNavigation');
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const localizedWhatsappMessage = t('whatsappMessage');

  // Define actions with MUI Icons and Brand Colors
  const actions = [
    {
      name: 'WhatsApp',
      icon: <WhatsAppIcon />,
      href: `https://wa.me/${contactConfig.phoneNumber.raw}?text=${encodeURIComponent(localizedWhatsappMessage)}`,
      color: '#25D366', // WhatsApp Green
    },
    {
      name: 'Email',
      icon: <EmailIcon />,
      href: `mailto:${contactConfig.email}`,
      color: '#EA4335', // Google Red
    },
    ...(contactConfig.linkedin ? [{
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      href: contactConfig.linkedin,
      color: '#0A66C2', // LinkedIn Blue
    }] : []),
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: { 
        opacity: 0, 
        scale: 0.8,
        transition: { staggerChildren: 0.05, staggerDirection: -1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.5 }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 24, md: 32 },
        right: { xs: 24, md: 32 }, // Always bottom-right for consistency
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column-reverse',
        alignItems: 'center',
        gap: 2
      }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* 1. The Trigger Beacon */}
      <Fab
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact"
        sx={{
          width: 64,
          height: 64,
          backgroundColor: theme.palette.secondary.main, // Amber
          color: 'black',
          boxShadow: `0 0 20px ${theme.palette.secondary.main}60`, // Amber Glow
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          '&:hover': {
            backgroundColor: '#fbbf24', // Lighter Amber
            transform: 'scale(1.1)',
            boxShadow: `0 0 30px ${theme.palette.secondary.main}90`,
          }
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CloseIcon sx={{ fontSize: 32 }} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatIcon sx={{ fontSize: 32 }} />
            </motion.div>
          )}
        </AnimatePresence>
      </Fab>

      {/* 2. The Pop-up Actions */}
      <AnimatePresence>
        {isOpen && (
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 1
            }}
          >
            {actions.map((action) => (
              <motion.div key={action.name} variants={itemVariants}>
                <Tooltip title={action.name} placement="left" arrow>
                  <Fab
                    component="a"
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="medium"
                    aria-label={action.name}
                    sx={{
                      backgroundColor: '#1a1a1a', // Obsidian Dark
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                      '&:hover': {
                        backgroundColor: action.color, // Brand Color on Hover
                        transform: 'scale(1.1)',
                        border: `1px solid ${action.color}`,
                        boxShadow: `0 0 20px ${action.color}60`
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    {action.icon}
                  </Fab>
                </Tooltip>
              </motion.div>
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}