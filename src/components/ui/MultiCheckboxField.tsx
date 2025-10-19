// src/components/ui/MultiCheckboxField.tsx
import React from 'react';
import { Control, useController, FieldPath, FieldValues } from 'react-hook-form';

interface MultiCheckboxFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  helpText?: string;
  disabled?: boolean;
}

export const MultiCheckboxField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  error,
  helpText,
  disabled = false,
}: MultiCheckboxFieldProps<TFieldValues>) => {
  const {
    field: { value, onChange },
    fieldState: { error: fieldError },
  } = useController({ name, control });

  const errorMessage = error || fieldError?.message;

  const handleCheckboxChange = (optionValue: string) => {
    // Ensure value is treated as an array of strings, even if it's undefined or null initially
    const currentSelected = Array.isArray(value) ? (value as unknown as string[]) : [];

    if (currentSelected.includes(optionValue)) {
      // Remove option if already selected
      // onChange expects a value compatible with the form field - cast through unknown to avoid `any`.
      onChange((currentSelected.filter((item) => item !== optionValue) as unknown) as string[]);
    } else {
      // Add option if not selected
      onChange(([...currentSelected, optionValue] as unknown) as string[]);
    }
  };

  // Ensure value is an array for rendering
  const selectedValues = Array.isArray(value) ? (value as unknown as string[]) : [];

  return (
    <div className="flex flex-col space-y-2">
      <label className="block text-gray-200 text-sm font-medium mb-1">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="checkbox"
              id={`${name}-${option.value}`}
              name={name as string} // name for grouping, important for accessibility
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              disabled={disabled}
              className={`
                h-4 w-4 text-blue-600 rounded
                border-gray-500 bg-gray-700
                focus:ring-blue-500
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            />
            <label htmlFor={`${name}-${option.value}`} className="ml-2 text-gray-300 text-sm cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </div>

      {errorMessage && (
        <p className="mt-1 text-sm text-red-400">{errorMessage}</p>
      )}
      {!errorMessage && helpText && (
        <p className="mt-1 text-xs text-gray-400">{helpText}</p>
      )}
    </div>
  );
};