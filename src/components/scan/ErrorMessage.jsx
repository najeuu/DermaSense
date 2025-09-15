import React from 'react';

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="w-full max-w-4xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default ErrorMessage;
