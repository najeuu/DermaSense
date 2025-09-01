import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, X, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { captureFromCamera } from '../utils/camera';
import { predictImage } from '../utils/axiosConfig';
import Result from '../components/Result';
import Solution from '../components/Solution';

const Scan = () => {
  const [preview, setPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanResults, setScanResults] = useState({
    diagnosis: '',
    date: '',
    severity: '',
    effects: [],
  });
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      setUploadedFile(file);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (file) {
      const msg = 'Hanya file gambar yang diperbolehkan!';
      setError(msg);
      alert(msg);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  // Camera capture
  const handleCameraCapture = async () => {
    try {
      const imageData = await captureFromCamera();
      setPreview(imageData);
      setFileName('camera-capture.jpg');
      setError(null);

      // Convert base64 to file for API
      const response = await fetch(imageData);
      const blob = await response.blob();
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      setUploadedFile(file);
    } catch (err) {
      if (err.message !== 'Dibatalkan oleh user') {
        setError(err.message);
        alert(err.message);
      }
    }
  };

  const handleClearPreview = () => {
    setPreview(null);
    setFileName('');
    setUploadedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Process API response to match UI format
  const processApiResponse = (apiData) => {
    try {
      const effects = [];
      const detailPrediction = apiData.detailedPrediction || {};

      const kemerahan = parseFloat(detailPrediction.kemerahan) || 0;
      const gatal = parseFloat(detailPrediction.gatal) || 0;
      const ketebalan = parseFloat(detailPrediction.ketebalan) || 0;
      const likenifikasi = parseFloat(detailPrediction.likenifikasi) || 0;

      effects.push({ name: 'Kemerahan', percentage: `${Math.round(kemerahan)}%` });
      effects.push({ name: 'Menggaruk', percentage: `${Math.round(gatal)}%` });
      effects.push({ name: 'Ketebalan', percentage: `${Math.round(ketebalan)}%` });
      effects.push({ name: 'Likenifikasi', percentage: `${Math.round(likenifikasi)}%` });

      // Determine severity
      let severity = 'Ringan';
      if (detailPrediction.keparahan?.kelas) {
        const backendSeverity = detailPrediction.keparahan.kelas.toLowerCase();
        if (backendSeverity.includes('parah') || backendSeverity.includes('tinggi'))
          severity = 'Tinggi';
        else if (backendSeverity.includes('sedang')) severity = 'Sedang';
      } else {
        const maxPercentage = Math.max(kemerahan, gatal, ketebalan, likenifikasi);
        if (maxPercentage > 60) severity = 'Tinggi';
        else if (maxPercentage > 30) severity = 'Sedang';
      }

      // Diagnosis
      let diagnosis = 'Kondisi Kulit Terdeteksi';
      if (detailPrediction.keparahan?.kelas) {
        diagnosis = `Analisis Kulit - ${detailPrediction.keparahan.kelas}`;
      }

      // Date
      const now = new Date();
      const formattedDate =
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WIB';

      return { diagnosis, date: formattedDate, severity, effects };
    } catch {
      return {
        diagnosis: 'Error memproses hasil',
        date: new Date().toLocaleDateString('id-ID') + ' WIB',
        severity: 'Tidak diketahui',
        effects: [
          { name: 'Kemerahan', percentage: '0%' },
          { name: 'Menggaruk', percentage: '0%' },
          { name: 'Ketebalan', percentage: '0%' },
          { name: 'Likenifikasi', percentage: '0%' },
        ],
      };
    }
  };

  // Handle scan with API integration
  const handleScan = async () => {
    if (!preview || !uploadedFile) {
      const msg = 'Silakan upload foto dulu!';
      setError(msg);
      alert(msg);
      return;
    }

    // Move preview to result area
    setResultImage(preview);

    // Reset upload area
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    setScanning(true);
    setScanCompleted(false);
    setError(null);

    try {
      const response = await predictImage(uploadedFile, 0.5);

      // Store scan date with unique identifier
      const scanDate = new Date().toISOString();
      const scanId = response._id || response.id || `scan_${Date.now()}`;
      const existingDates = JSON.parse(localStorage.getItem('scanDates') || '{}');
      existingDates[scanId] = scanDate;
      localStorage.setItem('scanDates', JSON.stringify(existingDates));

      // Process response for UI
      const processedResults = processApiResponse(response);
      setScanResults(processedResults);

      // Loading simulation for better UX
      setTimeout(() => {
        setScanning(false);
        setScanCompleted(true);
        window.dispatchEvent(new Event('historyUpdated'));
      }, 1500);
    } catch (error) {
      setScanning(false);

      // Error handling
      let errorMessage = 'Terjadi kesalahan saat memproses gambar.';
      if (error.message?.includes('connect') || error.message?.includes('network')) {
        errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Sesi Anda telah berakhir. Silakan login ulang.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data?.msg || 'File gambar tidak valid.';
      } else if (error.response?.status === 413) {
        errorMessage = 'Ukuran file terlalu besar. Maksimal 10MB.';
      } else if (error.message?.includes('timeout')) {
        errorMessage = 'Proses terlalu lama. Silakan coba lagi.';
      }

      setError(errorMessage);
      alert(errorMessage);

      // Reset states on error
      setPreview(resultImage);
      setResultImage(null);
    } finally {
      setUploadedFile(null);
    }
  };

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        {/* Title */}
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

        {/* Error Alert */}
        {error && (
          <div className="w-full max-w-4xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Upload Section */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="font-semibold text-lg text-gray-800 mb-4">Upload</h2>

          {/* Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-primary transition">
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="rounded-xl max-h-64 object-contain mb-4"
                />
                <button
                  onClick={handleClearPreview}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                >
                  <X size={16} />
                </button>
                {fileName && <p className="text-sm text-gray-600 text-center mt-2">{fileName}</p>}
              </div>
            ) : (
              <div onClick={handleUploadClick} className="cursor-pointer text-center">
                <UploadCloud size={40} className="mb-2 text-gray-400 mx-auto" />
                <p className="text-center mb-2">
                  Drop your picture here or{' '}
                  <span className="text-primary font-medium">click to browse</span>
                </p>
                <p className="text-sm text-gray-400">Max. Size: 10 MB</p>
              </div>
            )}

            {/* Action Buttons */}
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
                  onClick={handleUploadClick}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <RefreshCw size={18} />
                  Change Image
                </button>
              )}
            </div>
          </div>

          {/* Hidden Input File */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />

          {/* Scan Button */}
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
        </div>

        {/* Result Section */}
        <Result
          resultImage={resultImage}
          scanCompleted={scanCompleted}
          scanning={scanning}
          scanResults={scanResults}
        />

        {/* Solution Area */}
        <Solution scanCompleted={scanCompleted} scanResults={scanResults} />
      </main>
      <Footer />
    </div>
  );
};

export default Scan;
