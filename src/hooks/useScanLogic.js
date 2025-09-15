// hooks/useScanLogic.js
import { useState, useRef } from 'react';
import { captureFromCamera } from '../utils/camera';
import { predictImage } from '../utils/axiosConfig';
import { scanUtils } from '../utils/scanUtils';

export const useScanLogic = () => {
  // State Management
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanResults, setScanResults] = useState(scanUtils.createInitialScanResults());
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);

  // Utility Functions
  const showError = (message) => {
    setError(message);
    alert(message);
  };

  const clearAllStates = () => {
    setPreview(null);
    setFileName('');
    setUploadedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resetToPreview = () => {
    setPreview(resultImage);
    setResultImage(null);
  };

  // File Handling
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!scanUtils.isValidImageFile(file)) {
      showError('Hanya file gambar yang diperbolehkan!');
      return;
    }

    processSelectedFile(file);
  };

  const processSelectedFile = (file) => {
    setFileName(file.name);
    setUploadedFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Camera and Upload Actions
  const handleUploadClick = () => fileInputRef.current?.click();

  const handleCameraCapture = async () => {
    try {
      const imageData = await captureFromCamera();
      const response = await fetch(imageData);
      const blob = await response.blob();
      const file = scanUtils.createFileFromBlob(blob, 'camera-capture.jpg');

      setPreview(imageData);
      setFileName('camera-capture.jpg');
      setUploadedFile(file);
      setError(null);
    } catch (err) {
      if (err.message !== 'Dibatalkan oleh user') {
        showError(err.message);
      }
    }
  };

  const handleChangeImage = () => clearAllStates();

  // Scan Processing
  const prepareForScan = () => {
    setResultImage(preview);
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setScanning(true);
    setScanCompleted(false);
    setError(null);
  };

  const processScanSuccess = async (response) => {
    scanUtils.saveScanToHistory(response);
    const processedResults = scanUtils.processApiResponse(response);
    setScanResults(processedResults);

    setTimeout(() => {
      setScanning(false);
      setScanCompleted(true);
      window.dispatchEvent(new Event('historyUpdated'));
    }, scanUtils.CONFIG.SCAN_DELAY);
  };

  const handleScanError = (error) => {
    setScanning(false);
    const errorMessage = scanUtils.getErrorMessage(error);
    showError(errorMessage);
    resetToPreview();
  };

  const handleScan = async () => {
    if (!preview || !uploadedFile) {
      showError('Silakan upload foto dulu!');
      return;
    }

    prepareForScan();

    try {
      const response = await predictImage(uploadedFile, 0.5);
      await processScanSuccess(response);
    } catch (error) {
      handleScanError(error);
    } finally {
      setUploadedFile(null);
    }
  };

  return {
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
  };
};
