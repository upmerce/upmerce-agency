// src/components/sections/StatsSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, Container, Grid, Typography, useTheme, Paper } from '@mui/material';

const stats = [
  { value: 98, labelKey: 'performance' },
  { value: 99, labelKey: 'accessibility' },
  { value: 100, labelKey: 'bestPractices' },
  { value: 100, labelKey: 'seo' },
];

function StatCircle({ value, label }: { value: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const theme = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 1500;
          const end = value;
          const stepTime = Math.abs(Math.floor(duration / end));

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [value]);

  // Determine color based on score (Like Google Lighthouse)
  // 90+ is Green (Success), 50-89 is Orange, <50 is Red
  const strokeColor = value >= 90 ? '#10B981' : theme.palette.secondary.main;

  return (
    <Paper
      ref={ref}
      elevation={0}
      role="group"
      aria-labelledby={`stat-label-${label.replace(/\s/g, '-')}`}
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // "Obsidian Glass" Tile Style
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 4,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
        }
      }}
    >
      <Box sx={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          aria-hidden="true"
          style={{ transform: 'rotate(-90deg)' }} // Start from top
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            style={{
              strokeDasharray: 283,
              strokeDashoffset: 283 - (283 * count) / 100,
              transition: 'stroke-dashoffset 0.5s ease-out',
              filter: `drop-shadow(0 0 4px ${strokeColor}60)` // Neon Glow
            }}
          />
        </svg>

        {/* The Number */}
        <Typography
          variant="h4"
          aria-live="polite"
          role="status"
          sx={{
            position: 'absolute',
            fontWeight: 800,
            color: 'white',
            fontSize: '1.8rem',
          }}
        >
          {count}
        </Typography>
      </Box>

      {/* The Label */}
      <Typography
        id={`stat-label-${label.replace(/\s/g, '-')}`}
        variant="subtitle1"
        sx={{
          mt: 3,
          fontWeight: 600,
          color: 'text.secondary',
          letterSpacing: 1,
          textTransform: 'uppercase',
          fontSize: '0.75rem'
        }}
      >
        {label}
      </Typography>
    </Paper>
  );
}

export default function StatsSection() {
  const t = useTranslations('StatsSection');
  const theme = useTheme();

  return (
    <Box
      id="stats"
      component="section"
      aria-labelledby="stats-heading"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: theme.palette.background.default, // Obsidian
        borderBottom: '1px solid rgba(255,255,255,0.05)', // Subtle separator
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: theme.palette.success.main, // Teal text
              fontWeight: 700,
              letterSpacing: 2,
              mb: 1,
              display: 'block'
            }}
          >
            GOOGLE LIGHTHOUSE AUDIT
          </Typography>
          <Typography
            id="stats-heading"
            variant="h3"
            sx={{
              fontWeight: 800,
              color: 'white',
              mb: 2
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            {t('subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {stats.map((stat) => (
            <Grid  key={stat.labelKey} size={{xs: 6, md: 3}}>
              <StatCircle value={stat.value} label={t(stat.labelKey)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}