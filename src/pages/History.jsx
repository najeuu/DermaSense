import React, { useState, useEffect } from 'react';
import { Calendar, Eye, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const History = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);

const loadHistory = async () => {
  try {
    setLoading(true);
    setError(null);

    let apiHistory = [];
    try {
      const { getHistory } = await import('../utils/axiosConfig');
      const rawApiHistory = await getHistory();
      if (Array.isArray(rawApiHistory)) apiHistory = rawApiHistory;
    } catch {}

    const processedApiData = apiHistory.map((item) => {
      const mongoDate = new Date(parseInt(item._id.substring(0, 8), 16) * 1000);

      return {
        ...item,
        createdAt: item.predictionDate || item.createdAt || mongoDate.toISOString(),
        scanDate: item.predictionDate || item.createdAt || mongoDate.toISOString(),
        kemerahanPercent: parseInt(item.kemerahanPercent) || 0,
        gatalPercent: parseInt(item.gatalPercent) || 0,
        ketebalanPercent: parseInt(item.ketebalanPercent) || 0,
        likenifikasiPercent: parseInt(item.likenifikasiPercent) || 0,
        keparahanResult: item.keparahanResult || { kelas: 'Ringan' },
        summary: item.summary || 'Pemeriksaan kulit dari database',
      };
    });

    processedApiData.sort((a, b) => new Date(b.scanDate) - new Date(a.scanDate));

    setHistories(processedApiData);
  } catch {
    setError('Gagal memuat riwayat. Silakan coba lagi.');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadHistory();
    const handleHistoryUpdate = () => loadHistory();
    window.addEventListener('historyUpdated', handleHistoryUpdate);
    return () => window.removeEventListener('historyUpdated', handleHistoryUpdate);
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('data:image/') || imagePath.startsWith('http')) return imagePath;
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    return `${baseUrl}${imagePath}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Tanggal tidak tersedia';
    if (typeof dateString === 'string' && dateString.includes('WIB')) return dateString;

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Format tanggal tidak valid';
      return (
        date.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' WIB'
      );
    } catch {
      return 'Error format tanggal';
    }
  };

  const getSeverityColor = (severity) => {
    const kelas = severity?.toLowerCase() || '';
    if (kelas.includes('parah') || kelas.includes('tinggi')) return 'bg-red-100 text-red-600';
    if (kelas.includes('sedang')) return 'bg-yellow-100 text-yellow-600';
    return 'bg-green-100 text-green-600';
  };

  const getSeverityText = (severity) => {
    const kelas = severity?.toLowerCase() || '';
    if (kelas.includes('parah') || kelas.includes('tinggi')) return 'Tinggi';
    if (kelas.includes('sedang')) return 'Sedang';
    return 'Ringan';
  };

  const viewDetail = (history) => {
    setSelectedHistory(history);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedHistory(null);
    setShowModal(false);
  };

  const totalCount = histories.length;

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">
              <span className="text-primary">Riwayat </span>
              <span className="text-gray-800">Pemeriksaan</span>
            </h1>
            <p className="text-gray-600 mt-2">
              Lihat riwayat pengecekan kulit Anda di sini. Semua hasil analisis yang pernah Anda
              lakukan tersimpan dengan rapi sehingga Anda dapat memantau perkembangan kondisi kulit
              dari waktu ke waktu.
            </p>
          </div>

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

          {loading ? (
            <div className="flex flex-col items-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
              <span className="mt-4 text-gray-600">Memuat riwayat...</span>
            </div>
          ) : totalCount === 0 ? (
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
                onClick={() => (window.location.href = '/scan')}
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
                    <div className="h-48 bg-gray-100 relative">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Hasil scan"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Calendar size={32} />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                            history.keparahanResult?.kelas || history.severity,
                          )}`}
                        >
                          {getSeverityText(history.keparahanResult?.kelas || history.severity)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {history.diagnosis || 'Pemeriksaan Kulit'}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                        <div>Kemerahan: {history.kemerahanPercent}%</div>
                        <div>Gatal: {history.gatalPercent}%</div>
                        <div>Ketebalan: {history.ketebalanPercent}%</div>
                        <div>Likenifikasi: {history.likenifikasiPercent}%</div>
                      </div>
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

      {/* Modal Detail */}
      {showModal && selectedHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Detail Pemeriksaan</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={getImageUrl(selectedHistory.originalImagePath)}
                    alt="Hasil scan detail"
                    className="w-full rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {selectedHistory.diagnosis || 'Hasil Analisis Kulit'}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                        selectedHistory.keparahanResult?.kelas || selectedHistory.severity,
                      )}`}
                    >
                      {getSeverityText(
                        selectedHistory.keparahanResult?.kelas || selectedHistory.severity,
                      )}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    {formatDate(selectedHistory.createdAt)}
                  </p>
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
                        <td className="py-3 text-primary font-medium">
                          {selectedHistory.kemerahanPercent}%
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Pruritus</td>
                        <td className="py-3 text-primary font-medium">
                          {selectedHistory.gatalPercent}%
                        </td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Ketebalan</td>
                        <td className="py-3 text-primary font-medium">
                          {selectedHistory.ketebalanPercent}%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3">Likenifikasi</td>
                        <td className="py-3 text-primary font-medium">
                          {selectedHistory.likenifikasiPercent}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Ringkasan:</h4>
                    <p className="text-sm text-gray-600">{selectedHistory.summary}</p>
                  </div>
                  <div className="flex gap-3 mt-4">
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