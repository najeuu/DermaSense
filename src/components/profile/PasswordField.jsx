import React from 'react';
import { Lock } from 'lucide-react';

const PasswordField = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="password"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border rounded-lg p-3 pr-10 focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder={placeholder}
        />
        <Lock className="absolute right-3 top-3 text-gray-400" size={18} />
      </div>
    </div>
  );
};

export default PasswordField;
