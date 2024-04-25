import React from 'react';

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({ label, name, value, onChange, options, placeholder, required = false }) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-sky-500">{label}</label>
      <select
        name={name}
        className="mt-1 w-full max-w-[55vw] p-2 text-gray-500 rounded-md border border-gray-500 shadow-sm sm:text-sm"
        required={required}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
