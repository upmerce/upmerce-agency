// src/components/layout/CookieModal.tsx
'use client';

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { CookieConsentState } from "../context/CookieConsentContext";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, Button, Switch, Box, FormControlLabel, IconButton, useTheme, Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';

type Props = {
  currentConsent: CookieConsentState;
  onClose: () => void;
  onSave: (newState: CookieConsentState) => void;
};

export default function CookieModal({ currentConsent, onClose, onSave }: Props) {
  const t = useTranslations("CookieConsent");
  const theme = useTheme();
  const [localConsent, setLocalConsent] = useState(currentConsent);

  useEffect(() => {
    setLocalConsent(currentConsent);
  }, [currentConsent]);

  const handleToggle = (key: keyof CookieConsentState, value: boolean) => {
    setLocalConsent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveClick = () => {
    onSave(localConsent);
  };

  // Custom Amber Switch Style
  const switchSx = {
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: theme.palette.secondary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.5,
      },
    },
    '& .MuiSwitch-track': {
      backgroundColor: 'rgba(255,255,255,0.3)',
    }
  };

  const OptionRow = ({ label, desc, checked, onChange, disabled }: any) => (
    <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <FormControlLabel
        control={
          <Switch 
            checked={checked} 
            onChange={(e) => onChange && onChange(e.target.checked)} 
            disabled={disabled}
            sx={switchSx} 
          />
        }
        label={<Typography fontWeight={600} sx={{ color: 'white' }}>{label}</Typography>}
        sx={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row-reverse', ml: 0, mr: 0 }}
      />
      <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1, lineHeight: 1.4 }}>
        {desc}
      </Typography>
    </Box>
  );

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1a1a1a', // Obsidian Card
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 3,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          color: 'white'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
           <SecurityIcon sx={{ color: theme.palette.secondary.main }} />
           <Typography variant="h6" fontWeight={700}>
             {t('modal.title')}
           </Typography>
        </Stack>
        <IconButton onClick={onClose} sx={{ color: 'text.secondary', '&:hover': { color: 'white' } }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          {t('modal.description')}
        </Typography>

        <Stack spacing={2}>
          <OptionRow 
            label={t('modal.necessary.title')} 
            desc={t('modal.necessary.description')} 
            checked={true} 
            disabled 
          />
          <OptionRow 
            label={t('modal.analytics.title')} 
            desc={t('modal.analytics.description')} 
            checked={localConsent.analytics} 
            onChange={(v: boolean) => handleToggle("analytics", v)}
          />
          <OptionRow 
            label={t('modal.marketing.title')} 
            desc={t('modal.marketing.description')} 
            checked={localConsent.marketing} 
            onChange={(v: boolean) => handleToggle("marketing", v)}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Button onClick={onClose} sx={{ color: 'text.secondary', mr: 1 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSaveClick}
          variant="contained"
          sx={{
            bgcolor: theme.palette.secondary.main,
            color: 'black',
            fontWeight: 700,
            px: 4,
            '&:hover': { bgcolor: '#fbbf24' }
          }}
        >
          {t('modal.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}