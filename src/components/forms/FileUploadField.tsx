// src/components/forms/FileUploadField.tsx
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Control, useController, FieldPath, FieldValues } from 'react-hook-form';
import { Box, Typography, IconButton, CircularProgress, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileUploadFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  error?: string;
  helpText?: string;
  questionnaireId: string;
  storageSubfolder: string;
}

export const FileUploadField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  error,
  helpText,
  questionnaireId: _questionnaireId,
  storageSubfolder,
}: FileUploadFieldProps<TFieldValues>) => {
  const { field: { onChange, onBlur, value: formStoragePath, name: fieldName, ref } } = useController({ name, control });
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof formStoragePath === 'string' && formStoragePath.startsWith('https://')) {
      setPreviewUrl(formStoragePath);
    } else {
      setPreviewUrl(null);
    }
  }, [formStoragePath]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) { setPreviewUrl(null); onChange(''); return; }

    setLoading(true);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('questionnaireId', _questionnaireId);
    formData.append('storageSubfolder', storageSubfolder);

    try {
      const response = await fetch('/api/upload-file', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      onChange(data.displayUrl ?? '');
      setPreviewUrl(data.displayUrl ?? null);
      if (onBlur) onBlur();
    } catch (err) {
      console.error(err);
      onChange('');
      setPreviewUrl(null);
    } finally {
      setLoading(false);
      URL.revokeObjectURL(localPreview);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ color: 'white', mb: 1, fontWeight: 600 }}>{label}</Typography>
      
      <Box 
        sx={{
          border: '2px dashed',
          borderColor: error ? 'error.main' : 'rgba(255,255,255,0.2)',
          borderRadius: 2,
          p: 3,
          textAlign: 'center',
          bgcolor: 'rgba(255,255,255,0.02)',
          transition: 'all 0.2s',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            borderColor: theme.palette.secondary.main,
            bgcolor: 'rgba(255,255,255,0.04)'
          }
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {(previewUrl || loading) ? (
          <Box sx={{ position: 'relative', width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading ? (
              <CircularProgress color="secondary" />
            ) : (
              <>
                <Image src={previewUrl!} alt="Preview" fill style={{ objectFit: 'contain' }} />
                <IconButton 
                  onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
                  sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', '&:hover': { bgcolor: 'error.main' } }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </>
            )}
          </Box>
        ) : (
          <Box sx={{ py: 2 }}>
            <CloudUploadIcon sx={{ fontSize: 40, color: 'rgba(255,255,255,0.3)', mb: 1 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Click to Upload Image</Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 0.5 }}>Max 5MB (JPG, PNG, WEBP)</Typography>
          </Box>
        )}
        
        <input
          type="file"
          hidden
          ref={(e) => { ref(e); fileInputRef.current = e; }}
          onChange={handleFileChange}
          accept="image/*"
        />
      </Box>
      {error && <Typography variant="caption" color="error">{error}</Typography>}
      {!error && helpText && <Typography variant="caption" sx={{ color: 'text.disabled', mt: 0.5, display: 'block' }}>{helpText}</Typography>}
    </Box>
  );
};