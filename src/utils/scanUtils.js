// utils/scanUtils.js

// Constants
export const CONFIG = {
  MAX_FILE_SIZE: '10MB',
  SUPPORTED_FORMATS: 'image/*',
  SCAN_DELAY: 1500,
  CONFIDENCE_THRESHOLD: 0.1,
  LOW_PERCENTAGE_THRESHOLD: 5,
  TOTAL_LOW_THRESHOLD: 10,
};

const SEVERITY_LEVELS = {
  HIGH_THRESHOLD: 60,
  MEDIUM_THRESHOLD: 30,
};

// Helper Functions
export const createInitialScanResults = () => ({
  diagnosis: '',
  date: '',
  severity: '',
  effects: [],
});

export const isValidImageFile = (file) => file && file.type.startsWith('image/');

export const createFileFromBlob = (blob, filename) =>
  new File([blob], filename, { type: 'image/jpeg' });

export const formatCurrentDate = () => {
  const now = new Date();
  return (
    now.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB'
  );
};

// Detection Logic
export const isConditionNotDetected = (apiData) => {
  const detailPrediction = apiData.detailedPrediction || {};

  // Check explicit backend classification
  if (detailPrediction.keparahan?.kelas) {
    const kelas = detailPrediction.keparahan.kelas.toLowerCase();
    if (kelas.includes('tidak terdeteksi') || kelas === 'tidak terdeteksi') {
      return true;
    }
  }

  // Check if all values are extremely low
  const kemerahan = parseFloat(detailPrediction.kemerahan) || 0;
  const gatal = parseFloat(detailPrediction.gatal) || 0;
  const ketebalan = parseFloat(detailPrediction.ketebalan) || 0;
  const likenifikasi = parseFloat(detailPrediction.likenifikasi) || 0;

  const maxPercentage = Math.max(kemerahan, gatal, ketebalan, likenifikasi);
  const totalPercentage = kemerahan + gatal + ketebalan + likenifikasi;

  if (
    maxPercentage < CONFIG.LOW_PERCENTAGE_THRESHOLD &&
    totalPercentage < CONFIG.TOTAL_LOW_THRESHOLD
  ) {
    return true;
  }

  // Check confidence score
  if (apiData.confidence !== undefined && apiData.confidence < CONFIG.CONFIDENCE_THRESHOLD) {
    return true;
  }

  return false;
};

export const extractEffectsFromPrediction = (detailPrediction) => {
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

export const determineSeverityLevel = (detailPrediction, effects) => {
  if (detailPrediction.keparahan?.kelas) {
    const backendSeverity = detailPrediction.keparahan.kelas.toLowerCase();

    if (backendSeverity.includes('parah') || backendSeverity.includes('tinggi')) {
      return 'Parah';
    }
    if (backendSeverity.includes('sedang')) {
      return 'Sedang';
    }
    if (backendSeverity.includes('ringan')) {
      return 'Ringan';
    }
  }

  // Fallback calculation
  const maxPercentage = Math.max(...effects.map((effect) => parseInt(effect.percentage) || 0));

  if (maxPercentage > SEVERITY_LEVELS.HIGH_THRESHOLD) return 'Parah';
  if (maxPercentage > SEVERITY_LEVELS.MEDIUM_THRESHOLD) return 'Sedang';
  return 'Ringan';
};

export const generateDiagnosis = (detailPrediction) => {
  if (detailPrediction.keparahan?.kelas) {
    const severity = detailPrediction.keparahan.kelas;
    return `Analisis Kulit - ${severity}`;
  }
  return 'Kondisi Kulit Terdeteksi';
};

// Result Processing
export const getNotDetectedResults = () => ({
  diagnosis: 'Tidak Terdeteksi',
  date: formatCurrentDate(),
  severity: 'Tidak Terdeteksi',
  effects: [],
});

export const getErrorResults = () => ({
  diagnosis: 'Error memproses hasil',
  date: formatCurrentDate(),
  severity: 'Tidak diketahui',
  effects: [
    { name: 'Kemerahan', percentage: '0%' },
    { name: 'Pruritus', percentage: '0%' },
    { name: 'Ketebalan', percentage: '0%' },
    { name: 'Likenifikasi', percentage: '0%' },
  ],
});

export const processApiResponse = (apiData) => {
  try {
    const detailPrediction = apiData.detailedPrediction || {};

    if (isConditionNotDetected(apiData)) {
      return getNotDetectedResults();
    }

    const effects = extractEffectsFromPrediction(detailPrediction);
    const severity = determineSeverityLevel(detailPrediction, effects);
    const diagnosis = generateDiagnosis(detailPrediction);
    const date = formatCurrentDate();

    return { diagnosis, date, severity, effects };
  } catch (error) {
    console.error('Error processing API response:', error);
    return getErrorResults();
  }
};

// Error Handling
export const getErrorMessage = (error) => {
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

// Storage Helper
export const saveScanToHistory = (response) => {
  const scanDate = new Date().toISOString();
  const scanId = response._id || response.id || `scan_${Date.now()}`;

  if (!window.scanDates) {
    window.scanDates = '{}';
  }

  const existingDates = JSON.parse(window.scanDates);
  existingDates[scanId] = scanDate;
  window.scanDates = JSON.stringify(existingDates);
};

// Export all utilities as a single object for backward compatibility
export const scanUtils = {
  CONFIG,
  createInitialScanResults,
  isValidImageFile,
  createFileFromBlob,
  formatCurrentDate,
  isConditionNotDetected,
  extractEffectsFromPrediction,
  determineSeverityLevel,
  generateDiagnosis,
  getNotDetectedResults,
  getErrorResults,
  processApiResponse,
  getErrorMessage,
  saveScanToHistory,
};
