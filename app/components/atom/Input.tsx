import React from 'react';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string | Date;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, onChange, placeholder, required = false }) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-sky-500">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="mt-1 w-full max-w-[55vw] p-2 text-gray-500 rounded-md border border-gray-500 shadow-sm sm:text-sm"
        required={required}
        value={value instanceof Date ? value.toISOString().slice(0, 10) : value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
