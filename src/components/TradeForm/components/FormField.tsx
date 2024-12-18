import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: any;
  onChange: (name: string, value: any) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  options,
}) => {
  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {options ? (
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={(e) => onChange(name, e.target.value)}
          className={inputClasses}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value || ''}
          onChange={(e) => onChange(name, e.target.value)}
          className={inputClasses}
          required={required}
          step={type === 'number' ? 'any' : undefined}
        />
      )}
    </div>
  );
};