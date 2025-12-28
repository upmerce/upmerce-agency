// src/components/forms/CheckboxInput.tsx
import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { FormControlLabel, Checkbox, Typography, Box } from '@mui/material';

interface CheckboxInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helpText?: string;
  error?: string;
}

export const CheckboxInput = <TFieldValues extends FieldValues>({
  name, control, label, helpText, error
}: CheckboxInputProps<TFieldValues>) => {
  const { field: { onChange, value, ref } } = useController({ name, control });

  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            inputRef={ref}
            sx={{
              color: 'rgba(255,255,255,0.3)',
              '&.Mui-checked': { color: '#10B981' }, // Success Green
            }}
          />
        }
        label={<Typography sx={{ color: 'white', fontWeight: 500 }}>{label}</Typography>}
      />
      {helpText && <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', ml: 4, mt: -0.5 }}>{helpText}</Typography>}
      {error && <Typography variant="caption" color="error" sx={{ display: 'block', ml: 4 }}>{error}</Typography>}
    </Box>
  );
};