import { useState, useEffect } from 'react';

// Custom Hook untuk History Data
export const useHistoryData = () => {
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      let apiHistory = [];

      try {
        const { getHistory } = await import('../utils/axiosConfig');
        const rawApiHistory = await getHistory();
        if (Array.isArray(rawApiHistory)) apiHistory = rawApiHistory;
      } catch (error) {
        console.error('Error loading history from API:', error);
        // Silently continue with empty array - this is expected fallback behavior
      }

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

  return {
    histories,
    loading,
    error,
    totalCount: histories.length,
    loadHistory,
  };
};

// Utility Functions
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('data:image/') || imagePath.startsWith('http')) return imagePath;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  return `${baseUrl}${imagePath}`;
};

export const formatDate = (dateString) => {
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

export const getSeverityColor = (severity) => {
  const kelas = severity?.toLowerCase() || '';
  if (kelas.includes('parah')) return 'bg-red-100 text-red-600';
  if (kelas.includes('sedang')) return 'bg-yellow-100 text-yellow-600';
  return 'bg-green-100 text-green-600';
};

export const getSeverityText = (severity) => {
  const kelas = severity?.toLowerCase() || '';
  if (kelas.includes('parah')) return 'Parah';
  if (kelas.includes('sedang')) return 'Sedang';
  return 'Ringan';
};

export const createScanResultsForSolution = (history) => {
  return {
    severity: history.keparahanResult?.kelas || history.severity || 'Ringan',
    date: formatDate(history.scanDate || history.createdAt),
    kemerahanPercent: history.kemerahanPercent,
    gatalPercent: history.gatalPercent,
    ketebalanPercent: history.ketebalanPercent,
    likenifikasiPercent: history.likenifikasiPercent,
    summary: history.summary,
  };
};
