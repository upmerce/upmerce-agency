// src/components/forms/ColorPickerField.tsx
import React, { useState } from 'react';
import SketchPicker from '@uiw/react-color-sketch';
import { Control, useController, FieldPath, FieldValues } from 'react-hook-form';

interface ColorPickerFieldProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  error?: string;
  helpText?: string;
}

export const ColorPickerField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  helpText,
}: ColorPickerFieldProps<TFieldValues>) => {
  const {
    field: { onChange, onBlur, value, name: fieldName, ref },
  } = useController({ name, control });

  // State to control the visibility of the color picker popover
  const [showPicker, setShowPicker] = useState(false);

  // Fallback to a default color if the form value is empty or invalid
  const currentColor = (value as string || '#ffffff');

  const handleColorChange = (color: { hex: string }) => {
    onChange(color.hex); // react-color returns an object, we need the hex string
  };

  const handleClick = () => {
    setShowPicker((prev) => !prev); // Toggle picker visibility
  };

  const handleClose = () => {
    setShowPicker(false);
    onBlur(); // Trigger onBlur when picker closes
  };

  return (
    <div className="relative">
      <label htmlFor={fieldName} className="block text-gray-200 text-sm font-medium mb-1">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        {/* Color display and click trigger */}
        <div
          id={fieldName}
          className={`w-10 h-10 rounded-md border-2 cursor-pointer ${error ? 'border-red-500' : 'border-gray-600'}`}
          style={{ backgroundColor: currentColor }}
          onClick={handleClick}
          ref={ref} // Attach ref here
        ></div>
        {/* Display hex value as a text input (optional, but good for direct input/copy) */}
        <input
          type="text"
          value={currentColor} // Display the current hex value
          onChange={(e) => onChange(e.target.value)} // Allow manual hex input
          onBlur={handleClose} // Keep onBlur for direct input
          placeholder={placeholder || "#RRGGBB"}
          className={`flex-1 p-3 bg-gray-700 text-gray-100 border ${error ? 'border-red-500' : 'border-gray-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
      {!error && helpText && (
        <p className="mt-1 text-xs text-gray-400">{helpText}</p>
      )}

      {showPicker && (
        <div className="absolute z-10 mt-2"> {/* Position the picker relative to its parent */}
          <div className="fixed inset-0" onClick={handleClose} /> {/* Click outside to close */}
          <SketchPicker
            color={currentColor}
            onChange={handleColorChange}
            disableAlpha={true} // Usually, we don't need alpha for primary/secondary
            presetColors={[ // Optional: Provide some common presets
              '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
              '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
              '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
            ]}
            style={{
                backgroundColor: '#1F2937', // Dark background for the picker itself
                boxShadow: '0 0 0 1px hsla(0,0%,0%,0.1), 0 8px 16px rgba(0,0,0,0.3)',
                borderRadius: '8px',
                padding: '16px',
            }}
            // You might need to adjust the picker's internal styles further
            // depending on the library version and specific dark mode theme needs.
            // Some libraries offer theme props, check their docs.
          />
        </div>
      )}
    </div>
  );
};