import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
      <AlertCircle size={20} />
      <span>{error}</span>
      {onRetry && (
        <button onClick={onRetry} className="ml-auto text-red-600 hover:text-red-800 underline">
          Coba lagi
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
