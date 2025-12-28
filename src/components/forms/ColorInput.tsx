// src/components/forms/ColorInput.tsx
import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { Box, Typography, useTheme } from '@mui/material';

interface ColorInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helpText?: string;
  error?: string;
  disabled?: boolean;
}

export const ColorInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  helpText,
  error,
  disabled = false,
}: ColorInputProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, name: fieldName, ref },
  } = useController({ name, control });

  const theme = useTheme();
  const currentColor = value || '#ffffff';

  return (
    <Box sx={{ mb: 3 }}>
      <Typography 
        component="label" 
        htmlFor={fieldName}
        variant="subtitle2" 
        sx={{ color: 'white', mb: 1, fontWeight: 600, display: 'block' }}
      >
        {label}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
        {/* Visual Swatch (Triggers Input) */}
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: 2,
            bgcolor: currentColor,
            border: `2px solid ${error ? theme.palette.error.main : 'rgba(255,255,255,0.2)'}`,
            boxShadow: `0 0 15px -5px ${currentColor}80`, // Glow based on color
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            position: 'relative',
            overflow: 'hidden',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              borderColor: 'white'
            }
          }}
        >
          {/* Invisible Native Input covering the box */}
          <input
            id={fieldName}
            name={fieldName}
            type="color"
            value={currentColor}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            disabled={disabled}
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              opacity: 0,
              cursor: 'pointer'
            }}
          />
        </Box>

        {/* Hex Value Display */}
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: 'monospace', 
            color: 'rgba(255,255,255,0.7)',
            bgcolor: 'rgba(255,255,255,0.05)',
            px: 2,
            py: 1,
            borderRadius: 1,
            border: '1px solid rgba(255,255,255,0.1)',
            minWidth: '80px',
            textAlign: 'center'
          }}
        >
          {currentColor.toUpperCase()}
        </Typography>

      </Box>

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
          {error}
        </Typography>
      )}
      
      {!error && helpText && (
        <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>
          {helpText}
        </Typography>
      )}
    </Box>
  );
};