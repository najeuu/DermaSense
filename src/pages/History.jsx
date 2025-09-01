import React, { useState, useEffect } from "react";
import { Calendar, Eye, Download, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const History = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load history from both localStorage and API
  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Get scan history from localStorage (new scans)
      const localHistory = JSON.parse(localStorage.getItem('scanHistory') || '[]');
      console.log('📦 Loaded LOCAL history:', localHistory);
      
      // 2. Get history from API (old scans from database)  
      let apiHistory = [];
      try {
        const { getHistory } = await import("../utils/axiosConfig");
        const rawApiHistory = await getHistory();
        console.log('🌐 Raw API response:', rawApiHistory);
        
        // Handle case where API returns message instead of array
        if (Array.isArray(rawApiHistory)) {
          apiHistory = rawApiHistory;
        } else if (rawApiHistory.msg) {
          console.log('📝 API message:', rawApiHistory.msg);
          apiHistory = [];
        } else {
          apiHistory = [];
        }
        
        console.log('🌐 Processed API history:', apiHistory);
      } catch (apiError) {
        console.log('⚠️ Could not load API history:', apiError.message);
        // Continue with localStorage only
      }
      
      // 3. Process localStorage data
      const processedLocalData = localHistory.map((item) => {
        const findEffect = (name) => {
          const effect = item.effects?.find(e => e.name === name);
          return effect ? parseInt(effect.percentage) || 0 : 0;
        };
        
        return {
          _id: item.id,
          createdAt: item.date, // Use exact date from scan results
          originalImagePath: item.resultImage, // Use base64 image
          kemerahanPercent: findEffect('Kemerahan'),
          gatalPercent: findEffect('Menggaruk'), 
          ketebalanPercent: findEffect('Ketebalan'),
          likenifikasiPercent: findEffect('Likenifikasi'),
          keparahanResult: {
            kelas: item.severity
          },
          summary: `Diagnosis: ${item.diagnosis}. Tingkat keparahan: ${item.severity}.`,
          diagnosis: item.diagnosis,
          severity: item.severity,
          isFromLocalStorage: true,
          scanDate: item.timestamp // Keep original timestamp for deduplication
        };
      });
      
      // 4. Process API data (OLD scans from database - keep original dates)
      const processedApiData = apiHistory.map((item) => {
        // Extract date from MongoDB _id if no explicit date fields
        const mongoDate = new Date(parseInt(item._id.substring(0, 8), 16) * 1000);
        
        return {
          ...item,
          // Priority untuk tanggal: predictionDate > createdAt > MongoDB _id timestamp  
          createdAt: item.predictionDate || item.createdAt || mongoDate.toISOString(),
          originalImagePath: item.originalImagePath, // Already full URL from backend
          isFromLocalStorage: false,
          scanDate: item.predictionDate || item.createdAt || mongoDate.toISOString(),
          // Keep all original database fields
          kemerahanPercent: parseInt(item.kemerahanPercent) || 0,
          gatalPercent: parseInt(item.gatalPercent) || 0, 
          ketebalanPercent: parseInt(item.ketebalanPercent) || 0,
          likenifikasiPercent: parseInt(item.likenifikasiPercent) || 0,
          keparahanResult: item.keparahanResult || { kelas: 'Ringan' },
          summary: item.summary || 'Pemeriksaan kulit dari database',
          // Add database identifier
          fromDatabase: true
        };
      });
      
      // 5. Avoid duplicates by time proximity and better deduplication
      const localTimestamps = processedLocalData.map(item => item.scanTime || 0);
      
      // Filter API data to avoid duplicates
      const filteredApiData = processedApiData.filter(apiItem => {
        // Check if there's a localStorage scan very close in time
        const apiTimestamp = apiItem.actualTimestamp;
        
        const hasNearbyLocalScan = localTimestamps.some(localTime => 
          Math.abs(localTime - apiTimestamp) < 300000 // Within 5 minutes
        );
        
        if (hasNearbyLocalScan) {
          console.log(`Skipping potential duplicate API scan: ${apiItem._id}`);
          return false;
        }
        return true;
      });
      
      // 6. Combine and sort by date (newest first)
      const combinedHistory = [...processedLocalData, ...filteredApiData];
      
      // Sort by actual scan date/timestamp
      combinedHistory.sort((a, b) => {
        let dateA, dateB;
        
        if (a.isFromLocalStorage) {
          // For localStorage items, use timestamp for accurate sorting
          dateA = new Date(a.timestamp);
        } else {
          // For API items, use scanDate (predictionDate from database)
          dateA = new Date(a.scanDate);
        }
        
        if (b.isFromLocalStorage) {
          dateB = new Date(b.timestamp);  
        } else {
          dateB = new Date(b.scanDate);
        }
        
        return dateB - dateA; // Newest first
      });
      
      console.log('✅ Final combined history:', combinedHistory);
      console.log(`📊 Total: ${combinedHistory.length} (${processedLocalData.length} local + ${filteredApiData.length} API)`);
      
      setHistories(combinedHistory);
      
    } catch (err) {
      console.error('❌ Error loading history:', err);
      setError('Gagal memuat riwayat. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
    
    // Listen for history updates from scan page
    const handleHistoryUpdate = () => {
      console.log('🔄 History update event received, reloading...');
      loadHistory();
    };
    
    window.addEventListener('historyUpdated', handleHistoryUpdate);
    
    return () => {
      window.removeEventListener('historyUpdated', handleHistoryUpdate);
    };
  }, []);

  // Get base URL for images (handle base64 images)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's base64 data, return as is
    if (imagePath.startsWith('data:image/')) {
      return imagePath;
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a relative path, construct full URL
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    return `${baseUrl}${imagePath}`;
  };

  // Simple date formatting - use as is from scan results
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Tanggal tidak tersedia";
    }
    
    // If it's already formatted (contains "WIB"), return as is
    if (typeof dateString === 'string' && dateString.includes('WIB')) {
      return dateString;
    }
    
    try {
      const date = new Date(dateString);
      
      if (isNaN(date.getTime())) {
        return "Format tanggal tidak valid";
      }
      
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }) + " WIB";
      
    } catch (error) {
      console.error('Date formatting error:', error);
      return "Error format tanggal";
    }
  };

  // Get severity color
  const getSeverityColor = (severity) => {
    const kelas = severity?.toLowerCase() || '';
    if (kelas.includes('parah') || kelas.includes('tinggi')) {
      return 'bg-red-100 text-red-600';
    } else if (kelas.includes('sedang')) {
      return 'bg-yellow-100 text-yellow-600';
    } else {
      return 'bg-green-100 text-green-600';
    }
  };

  // Get severity text
  const getSeverityText = (severity) => {
    const kelas = severity?.toLowerCase() || '';
    if (kelas.includes('parah') || kelas.includes('tinggi')) return 'Tinggi';
    if (kelas.includes('sedang')) return 'Sedang';
    return 'Ringan';
  };

  // View detail modal
  const viewDetail = (history) => {
    setSelectedHistory(history);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedHistory(null);
    setShowModal(false);
  };

  // Download image
  const downloadImage = async (imageUrl, fileName) => {
    try {
      if (!imageUrl) {
        alert('URL gambar tidak tersedia.');
        return;
      }

      // Handle base64 images
      if (imageUrl.startsWith('data:image/')) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName || 'scan-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      // Handle regular URLs
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error('Gagal mengunduh gambar');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'scan-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading image:', err);
      alert('Gagal mengunduh gambar.');
    }
  };

  // Clear only localStorage history
  const clearHistory = () => {
    const localCount = histories.filter(h => h.isFromLocalStorage).length;
    if (localCount === 0) {
      alert('Tidak ada riwayat baru yang bisa dihapus.');
      return;
    }
    
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${localCount} riwayat scan baru?`)) {
      localStorage.removeItem('scanHistory');
      loadHistory(); // Reload to show only API data
    }
  };

  if (loading) {
    return (
      <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="animate-spin mx-auto mb-4 text-primary" size={32} />
            <p className="text-gray-600">Memuat riwayat...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-primary">Riwayat </span>
              <span className="text-gray-800">Pemeriksaan</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Lihat hasil pemeriksaan kulit yang telah Anda lakukan sebelumnya.
            </p>
          </div>

          {/* Controls */}
          {histories.length > 0 && (
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                <span>Total: {histories.length} pemeriksaan</span>
                <span className="mx-2">•</span>
                <span className="text-green-600">
                  {histories.filter(h => h.isFromLocalStorage).length} baru
                </span>
                <span className="mx-2">•</span>
                <span className="text-blue-600">
                  {histories.filter(h => !h.isFromLocalStorage).length} lama
                </span>
              </div>
              <button
                onClick={clearHistory}
                className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
              >
                <Trash2 size={14} />
                Hapus Riwayat Baru
              </button>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle size={20} />
              <span>{error}</span>
              <button
                onClick={loadHistory}
                className="ml-auto text-red-600 hover:text-red-800 underline"
              >
                Coba lagi
              </button>
            </div>
          )}

          {/* History Cards */}
          {histories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Belum ada riwayat pemeriksaan
              </h3>
              <p className="text-gray-500 mb-4">
                Mulai pemeriksaan pertama Anda untuk melihat riwayat di sini.
              </p>
              <button
                onClick={() => window.location.href = '/scan'}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
              >
                Mulai Pemeriksaan
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {histories.map((history) => {
                const imageUrl = getImageUrl(history.originalImagePath);
                
                return (
                  <div
                    key={history._id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    {/* Image */}
                    <div className="h-48 bg-gray-100 relative">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Hasil scan"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FtYmFyPC90ZXh0Pjwvc3ZnPg==';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Calendar size={32} />
                        </div>
                      )}
                      
                      {/* Severity badge */}
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(history.keparahanResult?.kelas || history.severity)}`}>
                          {getSeverityText(history.keparahanResult?.kelas || history.severity)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                        <Calendar size={14} />
                        <span>{formatDate(history.createdAt)}</span>
                        {history.isFromLocalStorage && (
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                            Baru
                          </span>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {history.diagnosis || "Pemeriksaan Kulit"}
                      </h3>
                      
                      {/* Quick stats */}
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                        <div>Kemerahan: {history.kemerahanPercent}%</div>
                        <div>Gatal: {history.gatalPercent}%</div>
                        <div>Ketebalan: {history.ketebalanPercent}%</div>
                        <div>Likenifikasi: {history.likenifikasiPercent}%</div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewDetail(history)}
                          className="flex-1 bg-primary text-white py-2 px-3 rounded-lg text-sm hover:bg-teal-600 transition flex items-center justify-center gap-1"
                        >
                          <Eye size={14} />
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {showModal && selectedHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Detail Pemeriksaan</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                <div>
                  <img
                    src={getImageUrl(selectedHistory.originalImagePath)}
                    alt="Hasil scan detail"
                    className="w-full rounded-xl"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+R2FtYmFyPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                </div>

                {/* Results */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {selectedHistory.diagnosis || "Hasil Analisis Kulit"}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedHistory.keparahanResult?.kelas || selectedHistory.severity)}`}>
                      {getSeverityText(selectedHistory.keparahanResult?.kelas || selectedHistory.severity)}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4">
                    {formatDate(selectedHistory.createdAt)}
                  </p>

                  {/* Results table */}
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left text-gray-500 text-sm border-b">
                        <th className="py-2 font-medium">Effect</th>
                        <th className="py-2 font-medium text-primary">Persentase</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Kemerahan</td>
                        <td className="py-3 text-primary font-medium">{selectedHistory.kemerahanPercent}%</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Menggaruk</td>
                        <td className="py-3 text-primary font-medium">{selectedHistory.gatalPercent}%</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Ketebalan</td>
                        <td className="py-3 text-primary font-medium">{selectedHistory.ketebalanPercent}%</td>
                      </tr>
                      <tr>
                        <td className="py-3">Likenifikasi</td>
                        <td className="py-3 text-primary font-medium">{selectedHistory.likenifikasiPercent}%</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Summary */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Ringkasan:</h4>
                    <p className="text-sm text-gray-600">{selectedHistory.summary}</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => downloadImage(
                        getImageUrl(selectedHistory.originalImagePath), 
                        `scan-${selectedHistory._id}.jpg`
                      )}
                      className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Download
                    </button>
                    <button
                      onClick={closeModal}
                      className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default History;