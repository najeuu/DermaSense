import React from 'react';
import { RefreshCw } from 'lucide-react';

const ScanButton = ({ preview, scanning, onScan }) => {
  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={onScan}
        disabled={!preview || scanning}
        className={`px-6 py-2 rounded-lg shadow transition ${
          !preview || scanning
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-teal-600'
        }`}
      >
        {scanning ? (
          <span className="flex items-center gap-2">
            <RefreshCw size={16} className="animate-spin" />
            Analyzing...
          </span>
        ) : (
          'Scan Now'
        )}
      </button>
    </div>
  );
};

export default ScanButton;
