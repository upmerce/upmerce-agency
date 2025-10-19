// src/components/ui/InputField.tsx
import React from 'react';
import { Control, useController, FieldPath, FieldValues } from 'react-hook-form';

interface InputFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url' | 'tel'; // Added 'url' type
  error?: string;
  helpText?: string;
  disabled?: boolean;
}

export const InputField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  error,
  helpText,
  disabled = false,
}: InputFieldProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, name: fieldName, ref },
  } = useController({ name, control });

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={fieldName} className="block text-gray-200 text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={fieldName}
        name={fieldName}
        type={type}
        value={value === null || value === undefined ? '' : value as string} // Ensure controlled component
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          block w-full px-4 py-2 rounded-md border
          bg-gray-700 text-gray-100
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : 'border-gray-600'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          placeholder-gray-400
          transition-colors duration-200 ease-in-out
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