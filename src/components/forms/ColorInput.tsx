// src/components/forms/ColorInput.tsx
import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

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
    fieldState: { error: fieldError },
  } = useController({ name, control });

  const displayError = error || fieldError?.message;

  return (
    <div>
      <label htmlFor={fieldName} className="block text-gray-200 text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={fieldName}
        name={fieldName}
        type="color"
        value={value === null || value === undefined ? '#ffffff' : value as string} // Default to white if no value
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        disabled={disabled}
        className={`
          w-24 h-12 p-1 rounded-md border
          bg-gray-700 text-white
          ${displayError ? 'border-red-500' : 'border-gray-600'}
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          transition-colors duration-200 ease-in-out
        `}
      />
      {displayError && (
        <p className="mt-1 text-sm text-red-400">{displayError}</p>
      )}
      {!displayError && helpText && (
        <p className="mt-1 text-xs text-gray-400">{helpText}</p>
      )}
    </div>
  );
};