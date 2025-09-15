import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useHistoryData } from '../utils/historyUtils';
import HistoryCard from '../components/history/HistoryCard';
import HistoryModal from '../components/history/HistoryModal';
import LoadingSpinner from '../components/history/LoadingSpinner';
import EmptyState from '../components/history/EmptyState';
import ErrorMessage from '../components/history/ErrorMessage';

const History = () => {
  const { histories, loading, error, totalCount, loadHistory } = useHistoryData();
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const viewDetail = (history) => {
    setSelectedHistory(history);
    setShowModal(true);
    setShowSolution(false);
  };

  const closeModal = () => {
    setSelectedHistory(null);
    setShowModal(false);
    setShowSolution(false);
  };

  const toggleSolutionView = (showSol) => {
    setShowSolution(showSol);
  };

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <HistoryHeader />

          <ErrorMessage error={error} onRetry={loadHistory} />

          <HistoryContent
            loading={loading}
            totalCount={totalCount}
            histories={histories}
            onViewDetail={viewDetail}
          />
        </div>
      </main>

      <HistoryModal
        show={showModal}
        selectedHistory={selectedHistory}
        showSolution={showSolution}
        onClose={closeModal}
        onToggleSolution={toggleSolutionView}
      />

      <Footer />
    </div>
  );
};

// Komponen Header
const HistoryHeader = () => (
  <div className="text-center mb-8">
    <h1 className="text-2xl sm:text-3xl font-bold">
      <span className="text-primary">Riwayat </span>
      <span className="text-gray-800">Pemeriksaan</span>
    </h1>
    <p className="text-gray-600 mt-2">
      Lihat riwayat pengecekan kulit Anda di sini. Semua hasil analisis yang pernah Anda lakukan
      tersimpan dengan rapi sehingga Anda dapat memantau perkembangan kondisi kulit dari waktu ke
      waktu.
    </p>
  </div>
);

// Komponen Content
const HistoryContent = ({ loading, totalCount, histories, onViewDetail }) => {
  if (loading) {
    return <LoadingSpinner message="Memuat riwayat..." />;
  }

  if (totalCount === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="Belum ada riwayat pemeriksaan"
        description="Mulai pemeriksaan pertama Anda untuk melihat riwayat di sini."
        buttonText="Mulai Pemeriksaan"
        buttonAction={() => (window.location.href = '/scan')}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {histories.map((history) => (
        <HistoryCard key={history._id} history={history} onViewDetail={onViewDetail} />
      ))}
    </div>
  );
};

export default History;
