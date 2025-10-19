// src/components/ui/SelectField.tsx
import React from 'react';
import { Control, useController, FieldPath, FieldValues } from 'react-hook-form';

interface SelectFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  helpText?: string;
  // Optional: Allow the select field to be a TextArea for longer inputs
  isTextArea?: boolean;
  rows?: number; // Number of rows for textarea
}

export const SelectField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  error,
  helpText,
  isTextArea = false,
  rows = 3,
}: SelectFieldProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  const errorMessage = error || fieldError?.message;

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={field.name} className="block text-gray-200 text-sm font-medium">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={field.name}
          {...field}
          rows={rows}
          className={`block w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
            errorMessage ? 'border-red-500' : 'border-gray-600'
          } focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <select
          id={field.name}
          {...field}
          className={`block w-full px-4 py-2 rounded-md bg-gray-700 text-white border ${
            errorMessage ? 'border-red-500' : 'border-gray-600'
          } focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {errorMessage && (
        <p className="mt-1 text-sm text-red-400">{errorMessage}</p>
      )}
      {!errorMessage && helpText && (
        <p className="mt-1 text-xs text-gray-400">{helpText}</p>
      )}
    </div>
  );
};