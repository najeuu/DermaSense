import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, X, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Result from '../components/Result';
import Solution from '../components/Solution';
import { captureFromCamera } from '../utils/camera';
import { predictImage } from '../utils/axiosConfig';

const Scan = () => {
  // State management
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanResults, setScanResults] = useState(getInitialScanResults());
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Constants
  const MAX_FILE_SIZE = '10MB';
  const SUPPORTED_FORMATS = 'image/*';
  const SCAN_DELAY = 1500;

  // Helper functions
  function getInitialScanResults() {
    return {
      diagnosis: '',
      date: '',
      severity: '',
      effects: [],
    };
  }

  function isImageFile(file) {
    return file && file.type.startsWith('image/');
  }

  function showError(message) {
    setError(message);
    alert(message);
  }

  function clearAllStates() {
    setPreview(null);
    setFileName('');
    setUploadedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  function createFileFromBlob(blob, filename) {
    return new File([blob], filename, { type: 'image/jpeg' });
  }

  // File handling
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    if (!isImageFile(file)) {
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

  // UI interactions
  const handleUploadClick = () => fileInputRef.current?.click();

  const handleCameraCapture = async () => {
    try {
      const imageData = await captureFromCamera();
      const response = await fetch(imageData);
      const blob = await response.blob();
      const file = createFileFromBlob(blob, 'camera-capture.jpg');

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

  const handleChangeImage = () => {
    clearAllStates();
  };

  // API response processing
  const processApiResponse = (apiData) => {
    try {
      const detailPrediction = apiData.detailedPrediction || {};
      const effects = extractEffects(detailPrediction);
      const severity = determineSeverity(detailPrediction, effects);
      const diagnosis = generateDiagnosis(detailPrediction);
      const date = formatCurrentDate();

      return { diagnosis, date, severity, effects };
    } catch {
      return getErrorScanResults();
    }
  };

  const extractEffects = (detailPrediction) => {
    const kemerahan = parseFloat(detailPrediction.kemerahan) || 0;
    const gatal = parseFloat(detailPrediction.gatal) || 0;
    const ketebalan = parseFloat(detailPrediction.ketebalan) || 0;
    const likenifikasi = parseFloat(detailPrediction.likenifikasi) || 0;

    return [
      { name: 'Kemerahan', percentage: `${Math.round(kemerahan)}%` },
      { name: 'Pruritus', percentage: `${Math.round(gatal)}%` },
      { name: 'Ketebalan', percentage: `${Math.round(ketebalan)}%` },
      { name: 'Likenifikasi', percentage: `${Math.round(likenifikasi)}%` },
    ];
  };

  const determineSeverity = (detailPrediction, effects) => {
    if (detailPrediction.keparahan?.kelas) {
      const backendSeverity = detailPrediction.keparahan.kelas.toLowerCase();
      if (backendSeverity.includes('parah') || backendSeverity.includes('tinggi')) {
        return 'Tinggi';
      }
      if (backendSeverity.includes('sedang')) {
        return 'Sedang';
      }
    }

    const maxPercentage = Math.max(
      ...effects.map(effect => parseInt(effect.percentage) || 0)
    );
    
    if (maxPercentage > 60) return 'Tinggi';
    if (maxPercentage > 30) return 'Sedang';
    return 'Ringan';
  };

  const generateDiagnosis = (detailPrediction) => {
    if (detailPrediction.keparahan?.kelas) {
      return `Analisis Kulit - ${detailPrediction.keparahan.kelas}`;
    }
    return 'Kondisi Kulit Terdeteksi';
  };

  const formatCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';
  };

  const getErrorScanResults = () => ({
    diagnosis: 'Error memproses hasil',
    date: new Date().toLocaleDateString('id-ID') + ' WIB',
    severity: 'Tidak diketahui',
    effects: [
      { name: 'Kemerahan', percentage: '0%' },
      { name: 'Pruritus', percentage: '0%' },
      { name: 'Ketebalan', percentage: '0%' },
      { name: 'Likenifikasi', percentage: '0%' },
    ],
  });

  // Scan processing
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
    saveScanToHistory(response);
    const processedResults = processApiResponse(response);
    setScanResults(processedResults);

    setTimeout(() => {
      setScanning(false);
      setScanCompleted(true);
      window.dispatchEvent(new Event('historyUpdated'));
    }, SCAN_DELAY);
  };

  const saveScanToHistory = (response) => {
    const scanDate = new Date().toISOString();
    const scanId = response._id || response.id || `scan_${Date.now()}`;
    const existingDates = JSON.parse(localStorage.getItem('scanDates') || '{}');
    existingDates[scanId] = scanDate;
    localStorage.setItem('scanDates', JSON.stringify(existingDates));
  };

  const handleScanError = (error) => {
    setScanning(false);
    const errorMessage = getErrorMessage(error);
    showError(errorMessage);
    setPreview(resultImage);
    setResultImage(null);
  };

  const getErrorMessage = (error) => {
    if (error.message?.includes('connect') || error.message?.includes('network')) {
      return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    }
    if (error.response?.status === 401) {
      return 'Sesi Anda telah berakhir. Silakan login ulang.';
    }
    if (error.response?.status === 400) {
      return error.response.data?.msg || 'File gambar tidak valid.';
    }
    if (error.response?.status === 413) {
      return 'Ukuran file terlalu besar. Maksimal 10MB.';
    }
    if (error.message?.includes('timeout')) {
      return 'Proses terlalu lama. Silakan coba lagi.';
    }
    return 'Terjadi kesalahan saat memproses gambar.';
  };

  // Render helpers
  const renderPreviewImage = () => (
    <div className="relative">
      <img
        src={preview}
        alt="Preview"
        className="rounded-xl max-h-64 object-contain mb-4"
      />
      <button
        onClick={handleChangeImage}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
      >
        <X size={16} />
      </button>
      {fileName && (
        <p className="text-sm text-gray-600 text-center mt-2">{fileName}</p>
      )}
    </div>
  );

  const renderUploadPrompt = () => (
    <div onClick={handleUploadClick} className="cursor-pointer text-center">
      <UploadCloud size={40} className="mb-2 text-gray-400 mx-auto" />
      <p className="text-center mb-2">
        Drop your picture here or{' '}
        <span className="text-primary font-medium">click to browse</span>
      </p>
      <p className="text-sm text-gray-400">Max. Size: {MAX_FILE_SIZE}</p>
    </div>
  );

  const renderActionButtons = () => (
    <div className="flex gap-3 mt-4">
      {!preview && (
        <button
          type="button"
          onClick={handleUploadClick}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <UploadCloud size={18} />
          Browse Files
        </button>
      )}
      <button
        type="button"
        onClick={handleCameraCapture}
        className="bg-primary hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
      >
        <Camera size={18} />
        Take Photo
      </button>
      {preview && (
        <button
          type="button"
          onClick={handleChangeImage}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Change Image
        </button>
      )}
    </div>
  );

  const renderScanButton = () => (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleScan}
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

  const renderError = () => {
    if (!error) return null;
    
    return (
      <div className="w-full max-w-4xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
        <p className="text-sm">{error}</p>
      </div>
    );
  };

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-8">
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

        {renderError()}

        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="font-semibold text-lg text-gray-800 mb-4">Upload</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-primary transition">
            {preview ? renderPreviewImage() : renderUploadPrompt()}
            {renderActionButtons()}
          </div>

          <input
            type="file"
            accept={SUPPORTED_FORMATS}
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {renderScanButton()}
        </div>

        <Result
          resultImage={resultImage}
          scanCompleted={scanCompleted}
          scanning={scanning}
          scanResults={scanResults}
        />
        <Solution scanCompleted={scanCompleted} scanResults={scanResults} />
      </main>
      <Footer />
    </div>
  );
};

export default Scan;