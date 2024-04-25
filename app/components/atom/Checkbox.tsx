import React from 'react';

interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor={name} className="text-sm font-semibold text-sky-500">{label}</label>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e)}
        className="form-checkbox h-5 w-5 text-sky-500 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
      />
    </div>
  );
};

export default Checkbox;
