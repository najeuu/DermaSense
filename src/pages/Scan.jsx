// pages/Scan.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Result from '../components/Result';
import Solution from '../components/Solution';
import ErrorMessage from '../components/scan/ErrorMessage';
import ScanUploadSection from '../components/scan/ScanUploadSection';
import { useScanLogic } from '../hooks/useScanLogic';
import { CONFIG } from '../utils/scanUtils';

const Scan = () => {
  const {
    // State
    preview,
    resultImage,
    scanning,
    scanCompleted,
    scanResults,
    fileName,
    error,
    fileInputRef,

    // Handlers
    handleFileChange,
    handleUploadClick,
    handleCameraCapture,
    handleChangeImage,
    handleScan,
  } = useScanLogic();

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">
            <span className="text-primary">Welcome to </span>
            <span className="text-gray-800">Scanning Area</span>
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Unggah foto wajah Anda untuk memulai pengecekan kondisi kulit. Sistem kami akan
            menganalisis secara cepat menggunakan teknologi berbasis AI yang akurat dan aman.
          </p>
        </div>

        {/* Error Message */}
        <ErrorMessage error={error} />

        {/* Upload Section */}
        <ScanUploadSection
          preview={preview}
          fileName={fileName}
          scanning={scanning}
          fileInputRef={fileInputRef}
          config={CONFIG}
          onFileChange={handleFileChange}
          onUploadClick={handleUploadClick}
          onCameraCapture={handleCameraCapture}
          onChangeImage={handleChangeImage}
          onScan={handleScan}
        />

        {/* Results Section */}
        <Result
          resultImage={resultImage}
          scanCompleted={scanCompleted}
          scanning={scanning}
          scanResults={scanResults}
        />

        {/* Solution Section */}
        <Solution scanCompleted={scanCompleted} scanResults={scanResults} />
      </main>

      <Footer />
    </div>
  );
};

export default Scan;
