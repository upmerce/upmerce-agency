// src/components/forms/CheckboxInput.tsx
import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

interface CheckboxInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helpText?: string;
  error?: string;
  disabled?: boolean;
}

export const CheckboxInput = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  helpText,
  error,
  disabled = false,
}: CheckboxInputProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, name: fieldName, ref },
    fieldState: { error: fieldError },
  } = useController({ name, control });

  const displayError = error || fieldError?.message;

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={fieldName}
          name={fieldName}
          type="checkbox"
          checked={!!value} // Convert any truthy/falsy value to boolean
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          className={`
            focus:ring-blue-500 h-4 w-4 text-blue-600 border
            ${displayError ? 'border-red-500' : 'border-gray-300'}
            rounded bg-gray-700
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            transition-colors duration-200 ease-in-out
          `}
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={fieldName} className="font-medium text-gray-200">
          {label}
        </label>
        {displayError && (
          <p className="mt-1 text-sm text-red-400">{displayError}</p>
        )}
        {!displayError && helpText && (
          <p className="mt-1 text-xs text-gray-400">{helpText}</p>
        )}
      </div>
    </div>
  );
};