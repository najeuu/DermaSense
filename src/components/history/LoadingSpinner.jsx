import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center py-20">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
    <span className="mt-4 text-gray-600">{message}</span>
  </div>
);

export default LoadingSpinner;
