import React from 'react';
import { UploadCloud, Camera, RefreshCw } from 'lucide-react';

const ActionButtons = ({ preview, onUploadClick, onCameraCapture, onChangeImage }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="flex gap-3">
        {!preview && (
          <button
            type="button"
            onClick={onUploadClick}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            <UploadCloud size={18} />
            Upload File
          </button>
        )}

        <button
          type="button"
          onClick={onCameraCapture}
          className="bg-primary hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <Camera size={18} />
          Ambil Foto
        </button>

        {preview && (
          <button
            type="button"
            onClick={onChangeImage}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Change Image
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
