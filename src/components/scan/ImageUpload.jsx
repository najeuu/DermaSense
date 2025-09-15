import React from 'react';
import { UploadCloud, X } from 'lucide-react';

const ImageUpload = ({
  preview,
  fileName,
  onFileChange,
  onUploadClick,
  onChangeImage,
  fileInputRef,
  config,
}) => {
  const PreviewImage = () => (
    <div className="relative">
      <img src={preview} alt="Preview" className="rounded-xl max-h-64 object-contain mb-4" />
      <button
        onClick={onChangeImage}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
      >
        <X size={16} />
      </button>
      {fileName && <p className="text-sm text-gray-600 text-center mt-2">{fileName}</p>}
    </div>
  );

  const UploadPrompt = () => (
    <div onClick={onUploadClick} className="cursor-pointer text-center">
      <UploadCloud size={40} className="mb-2 text-gray-400 mx-auto" />
      <p className="text-center mb-2">
        Drop your picture here or <span className="text-primary font-medium">click to browse</span>
      </p>
      <p className="text-sm text-gray-400">Max. Size: {config.MAX_FILE_SIZE}</p>
    </div>
  );

  return (
    <>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-primary transition">
        {preview ? <PreviewImage /> : <UploadPrompt />}
      </div>

      <input
        type="file"
        accept={config.SUPPORTED_FORMATS}
        className="hidden"
        ref={fileInputRef}
        onChange={onFileChange}
      />
    </>
  );
};

export default ImageUpload;
