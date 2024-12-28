import React from 'react';

type FormInputProps = {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

export default function FormInput({
  label,
  id,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
  error
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <input
        type={type}
        id={id}
        required={required}
        className={`mt-1 block w-full border rounded-md shadow-sm p-2 
          ${error 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 dark:border-gray-600 focus:ring-[#6CBF41] focus:border-[#6CBF41]'
          }
          dark:bg-gray-700 dark:text-white`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}