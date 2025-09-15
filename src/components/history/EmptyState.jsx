import React from 'react';

const EmptyState = ({ title, description, buttonText, buttonAction }) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <Icon className="text-gray-400" size={32} />
    </div>
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
    <p className="text-gray-500 mb-4">{description}</p>
    {buttonText && buttonAction && (
      <button
        onClick={buttonAction}
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
      >
        {buttonText}
      </button>
    )}
  </div>
);

export default EmptyState;
