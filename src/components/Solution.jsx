import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Constants
const SEVERITY_LEVELS = {
  RINGAN: 'ringan',
  SEDANG: 'sedang', 
  PARAH: 'parah',
  TIDAK_TERDETEKSI: 'tidak terdeteksi'
};
const SEVERITY_COLORS = {
  [SEVERITY_LEVELS.RINGAN]: 'green',
  [SEVERITY_LEVELS.SEDANG]: 'yellow',
  [SEVERITY_LEVELS.PARAH]: 'red',
  [SEVERITY_LEVELS.TIDAK_TERDETEKSI]: 'gray'
};
// Content data
const CONTENT_MAP = {
  [SEVERITY_LEVELS.RINGAN]: {
    faktorPenyebab: {
      description: 'Faktor ringan yang dapat menyebabkan iritasi kulit ringan pada kondisi Anda.',
      pills: [
        { text: 'Cuaca Kering', color: 'bg-blue-100 text-blue-800' },
        { text: 'Sabun Keras', color: 'bg-green-100 text-green-800' },
        { text: 'Stress Ringan', color: 'bg-yellow-100 text-yellow-800' },
        { text: 'Kurang Tidur', color: 'bg-purple-100 text-purple-800' },
        { text: 'Debu Ringan', color: 'bg-indigo-100 text-indigo-800' }
      ]
    },
    gejala: {
      description: 'Gejala ringan yang mungkin Anda alami saat ini.',
      pills: [
        { text: 'Kemerahan Ringan', color: 'bg-red-100 text-red-800' },
        { text: 'Gatal Sesekali', color: 'bg-orange-100 text-orange-800' },
        { text: 'Kulit Sedikit Kering', color: 'bg-yellow-100 text-yellow-800' },
        { text: 'Iritasi Lokal', color: 'bg-pink-100 text-pink-800' }
      ]
    },
    rekomendasiDosis: {
      description: 'Dosis ringan untuk mengatasi kondisi kulit ringan Anda.',
      pills: [
        { text: 'Moisturizer 2x/hari', color: 'bg-purple-100 text-purple-800' },
        { text: 'Hydrocortisone 0.5%', color: 'bg-indigo-100 text-indigo-800' },
        { text: 'Gentle Cleanser', color: 'bg-blue-100 text-blue-800' },
        { text: 'Aloe Vera Gel', color: 'bg-green-100 text-green-800' }
      ]
    },
    caraMengatasi: {
      description: 'Cara sederhana mengatasi kondisi kulit ringan.',
      pills: [
        { text: 'Kompres Dingin', color: 'bg-teal-100 text-teal-800' },
        { text: 'Hindari Garukan', color: 'bg-cyan-100 text-cyan-800' },
        { text: 'Pakai Baju Lembut', color: 'bg-blue-100 text-blue-800' },
        { text: 'Mandi Air Hangat', color: 'bg-green-100 text-green-800' }
      ]
    },
    tips: {
      description: 'Tips harian untuk menjaga kesehatan kulit Anda.',
      pills: [
        { text: 'Minum Air Putih 8 Gelas', color: 'bg-blue-100 text-blue-800' },
        { text: 'Pakai Sunscreen SPF 30', color: 'bg-lime-100 text-lime-800' },
        { text: 'Istirahat Cukup', color: 'bg-purple-100 text-purple-800' },
        { text: 'Olahraga Ringan', color: 'bg-orange-100 text-orange-800' }
      ]
    },
    saran: {
      description: 'Saran untuk perawatan mandiri kondisi ringan.',
      pills: [
        { text: 'Self-Care di Rumah', color: 'bg-emerald-100 text-emerald-800' },
        { text: 'Monitor Gejala', color: 'bg-green-100 text-green-800' },
        { text: 'Konsultasi Jika Memburuk', color: 'bg-blue-100 text-blue-800' }
      ]
    }
  },
  [SEVERITY_LEVELS.SEDANG]: {
    faktorPenyebab: {
      description: 'Faktor yang dapat memperburuk kondisi kulit sedang Anda.',
      pills: [
        { text: 'Alergen Makanan', color: 'bg-blue-200 text-blue-900' },
        { text: 'Debu & Tungau', color: 'bg-green-200 text-green-900' },
        { text: 'Stress Berkepanjangan', color: 'bg-yellow-200 text-yellow-900' },
        { text: 'Perubahan Hormon', color: 'bg-purple-200 text-purple-900' },
        { text: 'Polusi Udara', color: 'bg-red-200 text-red-900' },
        { text: 'Produk Kimia', color: 'bg-orange-200 text-orange-900' }
      ]
    },
    gejala: {
      description: 'Gejala sedang yang perlu diperhatikan lebih serius.',
      pills: [
        { text: 'Kemerahan Jelas', color: 'bg-red-200 text-red-900' },
        { text: 'Gatal Berkala', color: 'bg-orange-200 text-orange-900' },
        { text: 'Kulit Kering & Pecah', color: 'bg-yellow-200 text-yellow-900' },
        { text: 'Bengkak Ringan', color: 'bg-purple-200 text-purple-900' },
        { text: 'Rasa Terbakar', color: 'bg-pink-200 text-pink-900' }
      ]
    },
    rekomendasiDosis: {
      description: 'Pengobatan yang lebih intensif untuk kondisi sedang.',
      pills: [
        { text: 'Steroid Topikal Sedang', color: 'bg-purple-200 text-purple-900' },
        { text: 'Antihistamin 1x/hari', color: 'bg-indigo-200 text-indigo-900' },
        { text: 'Ceramide Cream 3x', color: 'bg-pink-200 text-pink-900' },
        { text: 'Emollient Kuat', color: 'bg-blue-200 text-blue-900' },
        { text: 'Calcineurin Inhibitor', color: 'bg-green-200 text-green-900' }
      ]
    },
    caraMengatasi: {
      description: 'Pendekatan komprehensif untuk mengatasi kondisi sedang.',
      pills: [
        { text: 'Rutinitas Skincare Ketat', color: 'bg-teal-200 text-teal-900' },
        { text: 'Identifikasi & Hindari Trigger', color: 'bg-cyan-200 text-cyan-900' },
        { text: 'Cool Compress 3x/hari', color: 'bg-blue-200 text-blue-900' },
        { text: 'Patch Test Produk', color: 'bg-green-200 text-green-900' }
      ]
    },
    tips: {
      description: 'Tips penting untuk mencegah perburukan kondisi.',
      pills: [
        { text: 'Diet Anti-Inflamasi', color: 'bg-orange-200 text-orange-900' },
        { text: 'Kelola Stress Aktif', color: 'bg-lime-200 text-lime-900' },
        { text: 'Humidifier di Kamar', color: 'bg-blue-200 text-blue-900' },
        { text: 'Vitamin D & E', color: 'bg-yellow-200 text-yellow-900' }
      ]
    },
    saran: {
      description: 'Disarankan untuk berkonsultasi dengan ahli.',
      pills: [
        { text: 'Konsultasi Dokter Kulit', color: 'bg-emerald-200 text-emerald-900' },
        { text: 'Follow-up Rutin 2 Minggu', color: 'bg-green-200 text-green-900' },
        { text: 'Test Alergi', color: 'bg-blue-200 text-blue-900' }
      ]
    }
  },
  [SEVERITY_LEVELS.PARAH]: {
    faktorPenyebab: {
      description: 'Faktor serius yang memperparah kondisi kulit Anda dan perlu perhatian khusus.',
      pills: [
        { text: 'Infeksi Bakteri Sekunder', color: 'bg-red-300 text-red-900' },
        { text: 'Allergen Berat & Persisten', color: 'bg-orange-300 text-orange-900' },
        { text: 'Stress Kronis Berat', color: 'bg-yellow-300 text-yellow-900' },
        { text: 'Faktor Genetik Kuat', color: 'bg-purple-300 text-purple-900' },
        { text: 'Gangguan Imun', color: 'bg-red-300 text-red-900' },
        { text: 'Komplikasi Sistemik', color: 'bg-pink-300 text-pink-900' }
      ]
    },
    gejala: {
      description: 'Gejala berat yang memerlukan penanganan medis segera.',
      pills: [
        { text: 'Kemerahan Parah & Menyebar', color: 'bg-red-400 text-red-900' },
        { text: 'Gatal Intens Tidak Terkendali', color: 'bg-orange-400 text-orange-900' },
        { text: 'Penebalan Kulit Signifikan', color: 'bg-yellow-400 text-yellow-900' },
        { text: 'Likenifikasi Ekstensif', color: 'bg-purple-400 text-purple-900' },
        { text: 'Erosi & Ekskoriasi', color: 'bg-red-400 text-red-900' },
        { text: 'Infeksi Sekunder', color: 'bg-pink-400 text-pink-900' }
      ]
    },
    rekomendasiDosis: {
      description: 'Pengobatan intensif yang harus dalam pengawasan medis ketat.',
      pills: [
        { text: 'Steroid Poten Kelas I-II', color: 'bg-red-300 text-red-900' },
        { text: 'Immunosuppressant Sistemik', color: 'bg-purple-300 text-purple-900' },
        { text: 'Antibiotik Topikal + Oral', color: 'bg-indigo-300 text-indigo-900' },
        { text: 'Barrier Repair Intensif', color: 'bg-pink-300 text-pink-900' },
        { text: 'Antihistamin Dosis Tinggi', color: 'bg-blue-300 text-blue-900' },
        { text: 'Phototherapy', color: 'bg-green-300 text-green-900' }
      ]
    },
    caraMengatasi: {
      description: 'Strategi komprehensif dan agresif untuk mengatasi kondisi parah.',
      pills: [
        { text: 'Terapi Medis Intensif', color: 'bg-red-300 text-red-900' },
        { text: 'Wet Wrapping Therapy', color: 'bg-blue-300 text-blue-900' },
        { text: 'Eliminasi Total Trigger', color: 'bg-orange-300 text-orange-900' },
        { text: 'Hospitalisasi Jika Perlu', color: 'bg-purple-300 text-purple-900' },
        { text: 'Perawatan Wound Care', color: 'bg-pink-300 text-pink-900' }
      ]
    },
    tips: {
      description: 'Tips khusus untuk manajemen kondisi berat sehari-hari.',
      pills: [
        { text: 'Skincare Extra Gentle', color: 'bg-blue-300 text-blue-900' },
        { text: '100% Cotton Clothing', color: 'bg-green-300 text-green-900' },
        { text: 'Humidity Control 45-55%', color: 'bg-teal-300 text-teal-900' },
        { text: 'Avoid Hot Water', color: 'bg-red-300 text-red-900' },
        { text: 'Psychological Support', color: 'bg-purple-300 text-purple-900' }
      ]
    },
    saran: {
      description: 'SEGERA konsultasi dengan dermatologis untuk penanganan optimal.',
      pills: [
        { text: 'RUJUK SPESIALIS SEGERA', color: 'bg-red-400 text-red-900' },
        { text: 'Monitoring Ketat Harian', color: 'bg-orange-400 text-orange-900' },
        { text: 'Emergency Action Plan', color: 'bg-yellow-400 text-yellow-900' },
        { text: 'Konsultasi Multi-Disiplin', color: 'bg-purple-400 text-purple-900' }
      ]
    }
  },
  [SEVERITY_LEVELS.TIDAK_TERDETEKSI]: {
    faktorPenyebab: {
      description: '-',
      pills: []
    },
    gejala: {
      description: '-',
      pills: []
    },
    rekomendasiDosis: {
      description: '-',
      pills: []
    },
    caraMengatasi: {
      description: '-',
      pills: []
    },
    tips: {
      description: '-',
      pills: []
    },
    saran: {
      description: '-',
      pills: []
    }
  }
};
// Section configuration
const SOLUTION_SECTIONS = [
  {
    title: 'Faktor Penyebab',
    icon: '🧬',
    key: 'faktorPenyebab',
    articlePath: 'faktor-penyebab'
  },
  {
    title: 'Gejala',
    icon: '🩺',
    key: 'gejala',
    articlePath: 'gejala'
  },
  {
    title: 'Rekomendasi Dosis',
    icon: '💊',
    key: 'rekomendasiDosis',
    articlePath: 'rekomendasi-dosis'
  },
  {
    title: 'Cara Mengatasi',
    icon: '🛡️',
    key: 'caraMengatasi',
    articlePath: 'cara-mengatasi'
  },
  {
    title: 'Tips',
    icon: '💡',
    key: 'tips',
    articlePath: 'tips'
  },
  {
    title: 'Saran',
    icon: '📋',
    key: 'saran',
    articlePath: 'saran'
  }
];
// Helper functions
const getSeverityColor = (severity) => {
  const severityLower = severity.toLowerCase();
  return SEVERITY_COLORS[severityLower] || 'green';
};
const getContentBySeverity = (severity) => {
  const severityLower = severity.toLowerCase();
  return CONTENT_MAP[severityLower] || CONTENT_MAP[SEVERITY_LEVELS.RINGAN];
};
const getSeverityColorClasses = (color) => {
  const colorMap = {
    red: 'bg-red-200 text-red-800',
    yellow: 'bg-yellow-200 text-yellow-800',
    green: 'bg-green-200 text-green-800',
    gray: 'bg-gray-200 text-gray-800'
  };
  return colorMap[color] || colorMap.green;
};
const getSectionColorClasses = (color) => {
  const colorMap = {
    red: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200',
    yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200',
    green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200',
    gray: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
  };
  return colorMap[color] || colorMap.green;
};
const getButtonColorClasses = (color) => {
  const colorMap = {
    red: 'bg-red-100 text-red-700 hover:bg-red-200',
    yellow: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    green: 'bg-green-100 text-green-700 hover:bg-green-200',
    gray: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  };
  return colorMap[color] || colorMap.green;
};
// Sub-components
const SeverityBadge = ({ severity, color, scanResults }) => (
  <div className="text-center mb-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Solution Area</h2>
    <div className="flex items-center justify-center gap-2">
      <span className="text-sm text-gray-600">Kondisi:</span>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColorClasses(color)}`}>
        {severity}
      </span>
    </div>
    {scanResults?.date && (
      <p className="text-sm text-gray-500 mt-1">Hasil scan: {scanResults.date}</p>
    )}
  </div>
);
const PillList = ({ pills, maxDisplay = 4 }) => (
  <div className="flex flex-wrap gap-2">
    {pills.slice(0, maxDisplay).map((pill, index) => (
      <span
        key={index}
        className={`px-2 py-1 rounded-full text-xs font-medium ${pill.color}`}
      >
        {pill.text}
      </span>
    ))}
    {pills.length > maxDisplay && (
      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
        +{pills.length - maxDisplay} lainnya
      </span>
    )}
  </div>
);
const SolutionSection = ({ section, content, color, severity }) => {
  const isNotDetected = severity === SEVERITY_LEVELS.TIDAK_TERDETEKSI;

  return (
    <div
      className={`rounded-lg p-4 border-2 transition-all hover:shadow-md ${getSectionColorClasses(color)}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{section.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
        </div>
      </div>
      
      {isNotDetected ? (
        <div className="text-center">
          <div className="h-px bg-gray-300 w-16 mx-auto mt-4"></div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 text-sm mb-3">{content.description}</p>
          {content.pills && content.pills.length > 0 && <PillList pills={content.pills} />}
        </>
      )}
    </div>
  );
};
const HistoryButton = ({ color, onClick }) => (
  <div className="text-center">
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-medium transition ${getButtonColorClasses(color)}`}
    >
      Lihat Semua Riwayat Pemeriksaan
    </button>
  </div>
);
// Main component
const Solution = ({ scanCompleted, scanResults }) => {
  const navigate = useNavigate();
  const [showTestControls] = useState(false);
  const [testSeverity] = useState('Parah');
  const getSeverityToUse = () => {
    if (scanCompleted && scanResults?.severity) {
      return scanResults.severity;
    }
    return showTestControls ? testSeverity : null;
  };
  const severityToUse = getSeverityToUse();
  if (!severityToUse) {
    return null;
  }
  const content = getContentBySeverity(severityToUse);
  const severityColor = getSeverityColor(severityToUse);
  const handleViewHistory = () => {
    navigate('/history');
  };
  return (
    <div className="max-w-6xl mx-auto mb-8 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <SeverityBadge 
          severity={severityToUse} 
          color={severityColor} 
          scanResults={scanResults} 
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {SOLUTION_SECTIONS.map((section) => (
            <SolutionSection
              key={section.key}
              section={section}
              content={content[section.key]}
              color={severityColor}
              severity={severityToUse}
            />
          ))}
        </div>
        
        <HistoryButton color={severityColor} onClick={handleViewHistory} />
      </div>
    </div>
  );
};
export default Solution;