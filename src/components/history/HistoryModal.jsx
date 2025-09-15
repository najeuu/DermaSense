import React from 'react';
import Solution from '../Solution';
import {
  formatDate,
  getImageUrl,
  getSeverityColor,
  getSeverityText,
  createScanResultsForSolution,
} from '../../utils/historyUtils';
const HistoryModal = ({ show, selectedHistory, showSolution, onClose, onToggleSolution }) => {
  if (!show || !selectedHistory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <ModalHeader
            title={showSolution ? 'Solusi & Rekomendasi' : 'Detail Pemeriksaan'}
            diagnosis={selectedHistory.diagnosis}
            onClose={onClose}
          />

          <TabNavigation showSolution={showSolution} onToggle={onToggleSolution} />

          {showSolution ? (
            <SolutionView selectedHistory={selectedHistory} />
          ) : (
            <DetailView selectedHistory={selectedHistory} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

const ModalHeader = ({ title, diagnosis, onClose }) => (
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-bold text-gray-800">
      {title} {diagnosis && `- ${diagnosis || 'Pemeriksaan Kulit'}`}
    </h2>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition text-xl px-2">
      ✕
    </button>
  </div>
);

const TabNavigation = ({ showSolution, onToggle }) => (
  <div className="flex bg-gray-100 rounded-lg p-1 mb-6 max-w-md">
    <TabButton active={!showSolution} onClick={() => onToggle(false)} text="Detail Pemeriksaan" />
    <TabButton active={showSolution} onClick={() => onToggle(true)} text="Solusi & Tips" />
  </div>
);

const TabButton = ({ active, onClick, text }) => (
  <button
    onClick={onClick}
    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
      active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
    }`}
  >
    {text}
  </button>
);

const SolutionView = ({ selectedHistory }) => (
  <Solution scanCompleted={true} scanResults={createScanResultsForSolution(selectedHistory)} />
);

const DetailView = ({ selectedHistory, onClose }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <DetailImage selectedHistory={selectedHistory} />
    <DetailInfo selectedHistory={selectedHistory} onClose={onClose} />
  </div>
);

const DetailImage = ({ selectedHistory }) => (
  <div>
    <img
      src={getImageUrl(selectedHistory.originalImagePath)}
      alt="Hasil scan detail"
      className="w-full rounded-xl"
    />
  </div>
);

const DetailInfo = ({ selectedHistory, onClose }) => (
  <div>
    <DetailHeader selectedHistory={selectedHistory} />
    <SymptomTable selectedHistory={selectedHistory} />
    <SummaryBox summary={selectedHistory.summary} />
    <ActionButtons onClose={onClose} />
  </div>
);

const DetailHeader = ({ selectedHistory }) => (
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
        {getSeverityText(selectedHistory.keparahanResult?.kelas || selectedHistory.severity)}
      </span>
    </div>
    <p className="text-gray-500 text-sm mb-4">{formatDate(selectedHistory.createdAt)}</p>
  </div>
);

const SymptomTable = ({ selectedHistory }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr className="text-left text-gray-500 text-sm border-b">
        <th className="py-2 font-medium">Effect</th>
        <th className="py-2 font-medium text-primary">Persentase</th>
      </tr>
    </thead>
    <tbody className="text-gray-700">
      <SymptomRow label="Kemerahan" value={selectedHistory.kemerahanPercent} />
      <SymptomRow label="Pruritus" value={selectedHistory.gatalPercent} />
      <SymptomRow label="Ketebalan" value={selectedHistory.ketebalanPercent} />
      <SymptomRow label="Likenifikasi" value={selectedHistory.likenifikasiPercent} isLast />
    </tbody>
  </table>
);

const SymptomRow = ({ label, value, isLast = false }) => (
  <tr className={!isLast ? 'border-b border-gray-100' : ''}>
    <td className="py-3">{label}</td>
    <td className="py-3 text-primary font-medium">{value}%</td>
  </tr>
);

const SummaryBox = ({ summary }) => (
  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
    <h4 className="font-medium text-gray-800 mb-2">Ringkasan:</h4>
    <p className="text-sm text-gray-600">{summary}</p>
  </div>
);

const ActionButtons = ({ onClose }) => (
  <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
    <button
      onClick={onClose}
      className="flex-1 bg-gray-100 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-200 transition font-medium"
    >
      Tutup
    </button>
  </div>
);

export default HistoryModal;
