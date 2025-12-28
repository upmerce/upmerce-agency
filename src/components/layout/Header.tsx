// src/components/layout/Header.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Box, 
  Button, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Stack, 
  useTheme, 
  useMediaQuery,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LanguageSwitcher from './LanguageSwitcher'; // Ensure this component is compatible with MUI or wrapped in a Box

export default function Header() {
  const t = useTranslations('AgencyNavigation');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [currentHash, setCurrentHash] = useState('');

  // Handle Hash Changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash);
      const handleHashChange = () => setCurrentHash(window.location.hash);
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  // Handle Navigation Logic (Scroll vs Link)
  const handleNavLinkClick = (target: string, type: 'scroll' | 'link') => {
    setIsMobileMenuOpen(false);

    setTimeout(() => {
      if (type === 'link') {
        router.push(target);
      } else if (target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (pathname !== '/') {
        router.push(`/#${target}`);
        // Allow time for navigation before scrolling
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  type NavLink = {
    name: string;
    target: string;
    type: 'scroll' | 'link';
  };

  const navLinks: NavLink[] = [
    { name: t('home'), target: '/', type: 'link' },
    { name: t('about'), target: '/about', type: 'link' },
    { name: t('solutions'), target: '/solutions', type: 'link' },
    { name: t('caseStudies'), target: '/case-studies', type: 'link' },
    { name: t('pricing'), target: 'pricing', type: 'scroll' },
    { name: t('faq'), target: 'faq', type: 'scroll' },
  ];

  const isActive = (link: NavLink) => {
    if (link.type === 'link') {
      return pathname === link.target;
    }
    return pathname === '/' && currentHash === `#${link.target}`;
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        // The "Obsidian Glass" Style
        backgroundColor: 'rgba(3, 3, 3, 0.8)', // Semi-transparent Obsidian
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          
          {/* 1. LOGO */}
          <Link href="/" aria-label={t('siteTitle')}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Image
                src="/icons/logo.webp"
                alt={t('siteTitle')}
                width={32}
                height={32}
                priority
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 800, 
                  color: 'white', 
                  letterSpacing: '-0.02em' 
                }}
              >
                {t('siteTitle')}
              </Typography>
            </Box>
          </Link>

          {/* 2. DESKTOP NAVIGATION */}
          {isDesktop && (
            <Stack direction="row" spacing={1} alignItems="center">
              {navLinks.map((link) => (
                <Button
                  key={link.target}
                  onClick={() => handleNavLinkClick(link.target, link.type)}
                  sx={{
                    color: isActive(link) ? 'white' : 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    px: 2,
                    position: 'relative',
                    '&:hover': {
                      color: theme.palette.secondary.main, // Amber on hover
                      backgroundColor: 'transparent'
                    },
                    // Active Indicator (Amber Dot)
                    '&::after': isActive(link) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 5,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.secondary.main
                    } : {}
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </Stack>
          )}

          {/* 3. ACTIONS (Lang + CTA) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <LanguageSwitcher />
            </Box>

            {/* Desktop CTA: The White Pill */}
            <Button
              onClick={() => handleNavLinkClick('contact', 'scroll')}
              variant="contained"
              sx={{
                display: { xs: 'none', md: 'block' },
                backgroundColor: 'white',
                color: 'black',
                borderRadius: '50px',
                fontWeight: 700,
                px: 3,
                boxShadow: `0 0 15px ${theme.palette.secondary.main}40`,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-1px)',
                  boxShadow: `0 0 20px ${theme.palette.secondary.main}60`,
                }
              }}
            >
              {t('ctaButton')}
            </Button>

            {/* Mobile Toggle */}
            <IconButton
              onClick={() => setIsMobileMenuOpen(true)}
              sx={{ display: { lg: 'none' }, color: 'white' }}
              aria-label={t('openMenu')}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* 4. MOBILE DRAWER */}
      <Drawer
        anchor="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 300,
            backgroundColor: theme.palette.background.paper, // Charcoal
            borderLeft: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      >
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Drawer Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'white' }}>
              {t('menu')}
            </Typography>
            <IconButton onClick={() => setIsMobileMenuOpen(false)} sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Links */}
          <List sx={{ flexGrow: 1 }}>
            {navLinks.map((link) => (
              <ListItem key={link.target} disablePadding>
                <ListItemButton 
                  onClick={() => handleNavLinkClick(link.target, link.type)}
                  sx={{ 
                    borderRadius: 2, 
                    mb: 1,
                    backgroundColor: isActive(link) ? 'rgba(255,255,255,0.05)' : 'transparent'
                  }}
                >
                  <ListItemText 
                    primary={link.name} 
                    primaryTypographyProps={{ 
                      fontSize: '1.1rem', 
                      fontWeight: isActive(link) ? 700 : 500,
                      color: isActive(link) ? theme.palette.secondary.main : 'white'
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Drawer Footer Actions */}
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
               <LanguageSwitcher />
            </Box>
            <Button
              onClick={() => handleNavLinkClick('contact', 'scroll')}
              variant="contained"
              fullWidth
              size="large"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                fontWeight: 700,
                borderRadius: 2
              }}
            >
              {t('ctaButton')}
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}