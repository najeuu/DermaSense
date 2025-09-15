import React from 'react';
import { Calendar, Eye } from 'lucide-react';
import { getImageUrl, getSeverityColor, getSeverityText } from '../../utils/historyUtils';

const HistoryCard = ({ history, onViewDetail }) => {
  const imageUrl = getImageUrl(history.originalImagePath);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <CardImage
        imageUrl={imageUrl}
        severity={history.keparahanResult?.kelas || history.severity}
      />
      <CardContent history={history} onViewDetail={onViewDetail} />
    </div>
  );
};

const CardImage = ({ imageUrl, severity }) => (
  <div className="h-48 bg-gray-100 relative">
    {imageUrl ? (
      <img src={imageUrl} alt="Hasil scan" className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        <Calendar size={32} />
      </div>
    )}
    <div className="absolute top-2 right-2">
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(severity)}`}>
        {getSeverityText(severity)}
      </span>
    </div>
  </div>
);

const CardContent = ({ history, onViewDetail }) => (
  <div className="p-4">
    <h3 className="font-semibold text-gray-800 mb-2">{history.diagnosis || 'Pemeriksaan Kulit'}</h3>
    <SymptomGrid history={history} />
    <div className="flex gap-2">
      <button
        onClick={() => onViewDetail(history)}
        className="flex-1 bg-primary text-white py-2 px-3 rounded-lg text-sm hover:bg-teal-600 transition flex items-center justify-center gap-1"
      >
        <Eye size={14} />
        Lihat
      </button>
    </div>
  </div>
);

const SymptomGrid = ({ history }) => (
  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
    <div>Kemerahan: {history.kemerahanPercent}%</div>
    <div>Gatal: {history.gatalPercent}%</div>
    <div>Ketebalan: {history.ketebalanPercent}%</div>
    <div>Likenifikasi: {history.likenifikasiPercent}%</div>
  </div>
);

export default HistoryCard;
