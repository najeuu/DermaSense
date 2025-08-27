import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowUpRight } from 'lucide-react';

const Scan = () => {
  return (
    <div className="min-h-screen text-gray-800 bg-gray-100 font-poppins">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="px-4 py-16 bg-white sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
            <span className="text-primary">Welcome to </span>
            <span className="text-black">Scanning Area</span>
          </h1>
          <p className="mt-8 mb-8 text-sm text-gray-600 sm:text-base">
            Unggah foto untuk analisis kulit Anda secara mendetail. Sistem akan otomatis menganalisis sekaligus memberikan rekomendasi berdasarkan analisis.
          </p>
          {/* <div className="p-8 text-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
            <p className="mb-4 text-gray-500">Drop your picture here or use the camera</p>
            <button className="px-6 py-2 text-white transition rounded-lg bg-primary hover:bg-teal-600">
              Scan Now
            </button>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Scan;