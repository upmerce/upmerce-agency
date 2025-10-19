// src/components/forms/FileUploadField.tsx
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Control, useController, FieldPath, FieldValues } from 'react-hook-form';

interface FileUploadFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  error?: string;
  helpText?: string;
  questionnaireId: string;
  // New prop to specify the folder within the questionnaireId path
  storageSubfolder: string; // e.g., 'logos' or 'social-images'
}

export const FileUploadField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  error,
  helpText,
  questionnaireId: _questionnaireId,
  storageSubfolder, // Use this for dynamic storage path
}: FileUploadFieldProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value: formStoragePath, name: fieldName, ref },
  } = useController({ name, control });

  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* useEffect(() => {
    const storagePathFromForm = formStoragePath as string;

    if (questionnaireId && storagePathFromForm && !previewUrl && !loading) {
      setLoading(true);
      const fetchSignedUrl = async () => {
        try {
          const response = await fetch(`/api/get-signed-url?path=${encodeURIComponent(storagePathFromForm)}&questionnaireId=${encodeURIComponent(questionnaireId)}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to get signed URL for existing ${storageSubfolder} image.`);
          }
            const data: { url?: string } = await response.json();
            setPreviewUrl(data.url ?? null);
        } catch (err) {
          console.error(`[FileUploadField - ${fieldName}] Error fetching signed URL:`, err);
          setPreviewUrl(null);
        } finally {
          setLoading(false);
        }
      };
      fetchSignedUrl();
    } else if (!storagePathFromForm && previewUrl) {
      setPreviewUrl(null);
    }
  }, [formStoragePath, questionnaireId, fieldName, previewUrl, loading]); */
  // ADD THIS BLOCK
  useEffect(() => {
    // If formStoragePath (which is now expected to be the signed URL) exists,
    // set it directly as the previewUrl.
    if (typeof formStoragePath === 'string' && formStoragePath.startsWith('https://')) {
      setPreviewUrl(formStoragePath);
    } else {
      setPreviewUrl(null); // Clear preview if no valid URL is present
    }
  }, [formStoragePath]); // Dependency: Only re-run when formStoragePath changes
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      onChange('');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG, PNG, GIF, SVG, WEBP images are allowed.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setPreviewUrl(null);
      onChange('');
      return;
    }
    if (file.size > maxFileSize) {
      alert('File size exceeds 5MB limit.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setPreviewUrl(null);
      onChange('');
      return;
    }

    setLoading(true);

  const localPreview = URL.createObjectURL(file);
  setPreviewUrl(localPreview);

    const formData = new FormData();
    formData.append('file', file); // Generic 'file' name
  formData.append('questionnaireId', _questionnaireId);
    formData.append('storageSubfolder', storageSubfolder); // Pass subfolder to API

    try {
      // Use a generic upload API endpoint
      const response = await fetch('/api/upload-file', { // NEW API ENDPOINT
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `File upload failed for ${storageSubfolder}.`);
      }

        const data: { displayUrl?: string } = await response.json();
  const displayUrl = data.displayUrl ?? '';
  onChange(displayUrl); // store the displayUrl or empty string
  setPreviewUrl(displayUrl); // set preview to URL or null

  if (typeof onBlur === 'function') onBlur();

  URL.revokeObjectURL(localPreview);

    } catch (err: unknown) {
      console.error(`[FileUploadField - ${fieldName}] Upload error:`, err);
      onChange('');
      setPreviewUrl(null);
      const e = err as { message?: string };
      alert(e.message || 'An unexpected error occurred during upload.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };
// ADD THIS NEW FUNCTION
  const handleRemoveImage = async () => {
    setLoading(true);
    try {
      onChange(''); // Clear the form field value
      setPreviewUrl(null); // Clear preview instantly
      // Optionally, if you want to delete from Firebase Storage,
      // you would make an API call here.
      // E.g., await fetch('/api/delete-file', { ... });
    } catch (error) {
      console.error(`Error removing ${fieldName}:`, error);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
    }
  };
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={fieldName} className="block text-gray-200 text-sm font-medium mb-1">
        {label}
      </label>

      {(previewUrl || loading) && (
        <div className="relative w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden border border-gray-600">
          {loading ? (
            <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
                previewUrl ? (
                    <div className="relative w-full h-full"> {/* Added a relative container */}
                          {previewUrl && previewUrl.startsWith('http') ? (
                            <Image src={previewUrl} alt={`${label} Preview`} fill style={{ objectFit: 'contain' }} />
                          ) : (
                            // The image here can be a blob/object URL (local preview). Next/Image doesn't support blob/object URLs
                            // so we keep a native <img> for that case and disable the Next.js rule for this line.
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previewUrl ?? ''} alt={`${label} Preview`} className="max-w-full max-h-full object-contain" />
                          )}
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white text-xs hover:bg-red-700 transition-colors z-10" // Added z-10 to ensure it's on top
                        aria-label={`Remove ${label} image`}
                        disabled={loading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    </div>
                ) : (
                    <span className="text-gray-400 text-sm">No preview available</span>
                )
          )}
        </div>
      )}

      <input
        type="file"
        id={fieldName}
        ref={(e) => {
          ref(e);
          (fileInputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
        }}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-400
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-600 file:text-white
                   hover:file:bg-blue-700
                   cursor-pointer bg-gray-800 rounded-md
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   "
        accept="image/jpeg, image/png, image/gif, image/svg+xml, image/webp"
      />

      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
      {!error && helpText && (
        <p className="mt-1 text-xs text-gray-400">{helpText}</p>
      )}
    </div>
  );
};