import React from 'react';
import ImageUpload from './ImageUpload';
import ActionButtons from './ActionButtons';
import ScanButton from './ScanButton';

const ScanUploadSection = ({
  preview,
  fileName,
  scanning,
  fileInputRef,
  config,
  onFileChange,
  onUploadClick,
  onCameraCapture,
  onChangeImage,
  onScan,
}) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 mb-10">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">Upload</h2>

      <ImageUpload
        preview={preview}
        fileName={fileName}
        onFileChange={onFileChange}
        onUploadClick={onUploadClick}
        onChangeImage={onChangeImage}
        fileInputRef={fileInputRef}
        config={config}
      />

      <ActionButtons
        preview={preview}
        onUploadClick={onUploadClick}
        onCameraCapture={onCameraCapture}
        onChangeImage={onChangeImage}
      />

      <ScanButton preview={preview} scanning={scanning} onScan={onScan} />
    </div>
  );
};

export default ScanUploadSection;
