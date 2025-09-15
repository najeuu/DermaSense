import React from 'react';

const FormField = ({ label, type = 'text', name, value, onChange, placeholder, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default FormField;
