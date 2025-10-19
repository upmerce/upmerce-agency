// src/components/ui/TextareaField.tsx
import React from 'react';
import { Control, useController, FieldPath, FieldValues } from 'react-hook-form';

interface TextareaFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  error?: string;
  helpText?: string;
  rows?: number;
  disabled?: boolean;
}

export const TextareaField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  helpText,
  rows = 4,
  disabled = false,
}: TextareaFieldProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, name: fieldName, ref },
  } = useController({ name, control });

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={fieldName} className="block text-gray-200 text-sm font-medium mb-1">
        {label}
      </label>
      <textarea
        id={fieldName}
        name={fieldName}
        value={value === null || value === undefined ? '' : value as string} // Ensure controlled component
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          block w-full px-4 py-2 rounded-md border
          bg-gray-700 text-gray-100
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : 'border-gray-600'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          placeholder-gray-400
          transition-colors duration-200 ease-in-out
          resize-y
        `}
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