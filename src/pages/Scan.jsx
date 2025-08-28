// src/pages/Scan.jsx
import React, { useState, useRef } from "react";
import { UploadCloud, Camera, X, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { captureFromCamera } from "../utils/camera";

const Scan = () => {
  const [preview, setPreview] = useState(null); // untuk upload area
  const [resultImage, setResultImage] = useState(null); // untuk result area
  const [scanning, setScanning] = useState(false);
  const [scanCompleted, setScanCompleted] = useState(false);
  const [scanResults, setScanResults] = useState({
    diagnosis: "Penyakit gatal",
    date: "Sabtu, 20 Juli 2024, Pukul 10:41 WIB",
    severity: "Sedang", // Ringan, Sedang, Tinggi
    effects: [
      { name: "Kemerahan", percentage: "35%" },
      { name: "Menggaruk", percentage: "35%" },
      { name: "Ketebalan", percentage: "36%" },
      { name: "Ukontinuiti", percentage: "35%" }
    ]
  });
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  // Handle file upload (pilih file dari komputer/HP)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        console.log("Preview set:", reader.result.substring(0, 50) + "..."); // Debug log
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert("Hanya file gambar yang diperbolehkan!");
    }
  };

  // Open file picker
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Ambil gambar dari kamera (pakai utils)
  const handleCameraCapture = async () => {
    try {
      const imageData = await captureFromCamera();
      setPreview(imageData);
      setFileName("camera-capture.jpg");
      console.log("Camera capture set:", imageData.substring(0, 50) + "..."); // Debug log
    } catch (err) {
      console.error("Camera error:", err);
      if (err.message !== "Dibatalkan oleh user") {
        alert(err.message);
      }
    }
  };

  // Clear preview
  const handleClearPreview = () => {
    setPreview(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Simulasi proses scan
  const handleScan = () => {
    if (!preview) {
      alert("Silakan upload foto dulu!");
      return;
    }
    
    // Pindahkan preview ke result area
    setResultImage(preview);
    
    // Reset upload area ke bentuk semula
    setPreview(null);
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    
    setScanning(true);
    setScanCompleted(false);
    
    setTimeout(() => {
      setScanning(false);
      setScanCompleted(true);
      // Update tanggal scan dengan waktu sekarang
      const now = new Date();
      const formattedDate = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric', 
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB';
      
      setScanResults(prev => ({
        ...prev,
        date: formattedDate,
        // Simulasi random severity berdasarkan persentase tertinggi
        severity: Math.max(...prev.effects.map(e => parseInt(e.percentage))) > 40 ? "Tinggi" : 
                 Math.max(...prev.effects.map(e => parseInt(e.percentage))) > 25 ? "Sedang" : "Ringan"
      }));
    }, 3000);
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
            Unggah foto wajah Anda untuk memulai pengecekan kondisi kulit.
            Sistem kami akan menganalisis secara cepat menggunakan teknologi
            berbasis AI yang akurat dan aman.
          </p>
        </div>

        {/* Upload Section */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 mb-10">
          <h2 className="font-semibold text-lg text-gray-800 mb-4">Upload</h2>
          
          {/* Upload Box */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:border-primary transition">
            
            {preview ? (
              // Show preview if image exists
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
                {fileName && (
                  <p className="text-sm text-gray-600 text-center mt-2">
                    {fileName}
                  </p>
                )}
              </div>
            ) : (
              // Show upload area if no preview
              <div onClick={handleUploadClick} className="cursor-pointer text-center">
                <UploadCloud size={40} className="mb-2 text-gray-400 mx-auto" />
                <p className="text-center mb-2">
                  Drop your picture here or{" "}
                  <span className="text-primary font-medium">
                    click to browse
                  </span>
                </p>
                <p className="text-sm text-gray-400">Max. Size: 25 MB</p>
              </div>
            )}
            
            {/* Camera Button - always visible */}
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

          <div className="flex justify-center mt-6">
            <button
              onClick={handleScan}
              disabled={!preview || scanning}
              className={`px-6 py-2 rounded-lg shadow transition ${
                !preview || scanning
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-teal-600"
              }`}
            >
              {scanning ? (
                <span className="flex items-center gap-2">
                  <RefreshCw size={16} className="animate-spin" />
                  Scanning...
                </span>
              ) : (
                "Scan Now"
              )}
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-semibold text-lg text-gray-800 mb-4">The Result</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center text-gray-400 min-h-[200px]">
              {resultImage ? (
                <img
                  src={resultImage}
                  alt="Scan Result"
                  className="rounded-xl max-h-64 object-contain"
                />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                    <UploadCloud size={24} className="text-gray-400" />
                  </div>
                  <p>Ready for your result</p>
                </div>
              )}
            </div>

            {/* Table Result */}
            <div>
              {scanCompleted ? (
                <div>
                  {/* Header dengan diagnosis dan badge */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{scanResults.diagnosis}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      scanResults.severity === 'Tinggi' 
                        ? 'bg-red-100 text-red-600' 
                        : scanResults.severity === 'Sedang'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {scanResults.severity}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{scanResults.date}</p>
                  
                  {/* Table hasil */}
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-gray-500 text-sm border-b">
                        <th className="py-2 font-medium">Effect</th>
                        <th className="py-2 font-medium text-primary">Presentase</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {scanResults.effects.map((effect, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3">{effect.name}</td>
                          <td className="py-3 text-primary font-medium">{effect.percentage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-3">
                    {scanning
                      ? "Scanning in progress..."
                      : "Waiting for your scanning . . ."}
                  </p>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-gray-500 text-sm border-b">
                        <th className="py-2 font-medium">Effect</th>
                        <th className="py-2 font-medium">Presentase</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Kemerahan</td>
                        <td className="py-3 text-gray-400">-</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Menggaruk</td>
                        <td className="py-3 text-gray-400">-</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Ketebalan</td>
                        <td className="py-3 text-gray-400">-</td>
                      </tr>
                      <tr>
                        <td className="py-3">Ukontinuiti</td>
                        <td className="py-3 text-gray-400">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Solution Area - hanya muncul setelah scan selesai */}
        {scanCompleted && (
          <div className="w-full max-w-4xl mt-8">
            <h2 className="text-2xl font-bold mb-6">
              <span className="text-primary">Solution </span>
              <span className="text-gray-800">Area</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Faktor Penyebab */}
              <div className="bg-primary rounded-2xl p-4 text-white relative overflow-hidden flex gap-4">
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-lg mb-2">Faktor Penyebab</h3>
                  <p className="text-sm mb-3 opacity-90">
                    Berisi menjelaskan faktor dari penyebab yang menyebabkan penyakit tersebut.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/article'}
                    className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    See all
                  </button>
                </div>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Gejala */}
              <div className="bg-primary rounded-2xl p-4 text-white relative overflow-hidden flex gap-4">
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-lg mb-2">Gejala</h3>
                  <p className="text-sm mb-3 opacity-90">
                    Berisi menjelaskan gejala dari penyakit yang muncul.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/article'}
                    className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    See all
                  </button>
                </div>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Rekomendasi Dosis */}
              <div className="bg-primary rounded-2xl p-4 text-white relative overflow-hidden flex gap-4">
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-lg mb-2">Rekomendasi Dosis</h3>
                  <p className="text-sm mb-3 opacity-90">
                    Berisi menjelaskan rekomendasi dosis obat gejala tersebut.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/article'}
                    className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    See all
                  </button>
                </div>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <rect x="7" y="7" width="3" height="9"/>
                      <rect x="14" y="7" width="3" height="5"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Cara Mengatasi */}
              <div className="bg-primary rounded-2xl p-4 text-white relative overflow-hidden flex gap-4">
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-lg mb-2">Cara Mengatasi</h3>
                  <p className="text-sm mb-3 opacity-90">
                    Berisi menjelaskan cara menjaga agar penyakit tersebut.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/article'}
                    className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    See all
                  </button>
                </div>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-primary rounded-2xl p-4 text-white relative overflow-hidden flex gap-4">
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-lg mb-2">Tips</h3>
                  <p className="text-sm mb-3 opacity-90">
                    Berisi menjelaskan beberapa tips yang ada untuk kejadian gejala tersebut.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/article'}
                    className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    See all
                  </button>
                </div>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <circle cx="12" cy="17" r="1"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Saran */}
              <div className="bg-primary rounded-2xl p-4 text-white relative overflow-hidden flex gap-4">
                <div className="flex-1 relative z-10">
                  <h3 className="font-semibold text-lg mb-2">Saran</h3>
                  <p className="text-sm mb-3 opacity-90">
                    Berisi menjelaskan saran yang ada untuk penyakit tersebut.
                  </p>
                  <button 
                    onClick={() => window.location.href = '/article'}
                    className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                  >
                    See all
                  </button>
                </div>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex-shrink-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Scan;