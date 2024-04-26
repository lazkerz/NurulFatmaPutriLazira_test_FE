import React from 'react';

interface InputProps {
  label: string;
  type: 'text' | 'date'; // Tipe data didefinisikan sebagai 'text' atau 'date'
  name: string;
  value: string | Date; // Union type: bisa string atau Date
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, onChange, placeholder, required = false }) => {
  // Tentukan value berdasarkan tipe data
  const inputValue = typeof value === 'string' ? value : (value instanceof Date && !isNaN(value.getTime()) ? value.toISOString().substr(0, 10) : '');

  return (
    <div>
      <label className="block text-xs font-semibold text-sky-500">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="mt-1 w-full max-w-[55vw] p-2 text-gray-500 rounded-md border border-gray-500 shadow-sm sm:text-sm"
        required={required}
        value={inputValue} 
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
