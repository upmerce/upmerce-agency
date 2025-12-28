// src/components/forms/ColorPickerField.tsx
import React, { useState } from 'react';
import SketchPicker from '@uiw/react-color-sketch';
import { Control, useController, FieldPath, FieldValues } from 'react-hook-form';
import { Box, Typography, ClickAwayListener, useTheme } from '@mui/material';

interface ColorPickerFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  error?: string;
  helpText?: string;
}

export const ColorPickerField = <TFieldValues extends FieldValues>({
  name, control, label, error, helpText
}: ColorPickerFieldProps<TFieldValues>) => {
  const { field: { onChange, value, name: fieldName, ref } } = useController({ name, control });
  const [showPicker, setShowPicker] = useState(false);
  const theme = useTheme();
  const currentColor = (value as string || '#ffffff');

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>{label}</Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          onClick={() => setShowPicker(!showPicker)}
          ref={ref}
          sx={{
            width: 50, height: 50, borderRadius: 2,
            bgcolor: currentColor,
            border: `2px solid ${error ? theme.palette.error.main : 'rgba(255,255,255,0.2)'}`,
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            '&:hover': { borderColor: 'white' }
          }}
        />
        <input
          type="text"
          value={currentColor}
          onChange={(e) => onChange(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            width: '120px'
          }}
        />
      </Box>

      {showPicker && (
        <ClickAwayListener onClickAway={() => setShowPicker(false)}>
          <Box sx={{ position: 'absolute', zIndex: 10, mt: 1 }}>
            <SketchPicker 
              color={currentColor} 
              onChange={(c) => onChange(c.hex)} 
              style={{ background: '#1a1a1a', borderRadius: '8px' }}
            />
          </Box>
        </ClickAwayListener>
      )}

      {error && <Typography variant="caption" color="error" display="block" mt={0.5}>{error}</Typography>}
      {!error && helpText && <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>{helpText}</Typography>}
    </Box>
  );
};