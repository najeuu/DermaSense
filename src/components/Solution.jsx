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

// Content data (biarin sama, nanti di-overwrite strip kalau tidak terdeteksi)
const CONTENT_MAP = {
  [SEVERITY_LEVELS.RINGAN]: { /* ... konten seperti sebelumnya ... */ },
  [SEVERITY_LEVELS.SEDANG]: { /* ... konten seperti sebelumnya ... */ },
  [SEVERITY_LEVELS.PARAH]: { /* ... konten seperti sebelumnya ... */ },
  [SEVERITY_LEVELS.TIDAK_TERDETEKSI]: { /* ... konten default seperti sebelumnya ... */ }
};

// Section configuration
const SOLUTION_SECTIONS = [
  { title: 'Faktor Penyebab', icon: '🧬', key: 'faktorPenyebab' },
  { title: 'Gejala', icon: '🩺', key: 'gejala' },
  { title: 'Rekomendasi Dosis', icon: '💊', key: 'rekomendasiDosis' },
  { title: 'Cara Mengatasi', icon: '🛡️', key: 'caraMengatasi' },
  { title: 'Tips', icon: '💡', key: 'tips' },
  { title: 'Saran', icon: '📋', key: 'saran' }
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
  const isNotDetected = severity.toLowerCase() === SEVERITY_LEVELS.TIDAK_TERDETEKSI;

  const pillsToShow = isNotDetected
    ? Array(3).fill({ text: '-', color: 'bg-gray-100 text-gray-400' })
    : content.pills;

  return (
    <div className={`rounded-lg p-4 border-2 transition-all hover:shadow-md ${getSectionColorClasses(color)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{section.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3">
        {isNotDetected ? '-' : content.description}
      </p>
      <PillList pills={pillsToShow} />
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
