import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const LoadingSpinner = () => {
  return (
    <div className="font-poppins bg-[#F9FAFB] min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat profil...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoadingSpinner;
