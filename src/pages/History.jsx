// src/pages/History.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const History = () => {
  const historyData = [
    {
      id: 1,
      penyakit: "Penyakit Gatal",
      tanggal: "12 July 2025",
      waktu: "15:21 WIB",
      status: "Sedang",
    },
    {
      id: 2,
      penyakit: "Penyakit Kulit Kering",
      tanggal: "10 July 2025",
      waktu: "10:45 WIB",
      status: "Selesai",
    },
  ];

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          <span className="text-primary">History</span>{" "}
          <span className="text-gray-800">Data</span>
        </h2>

        {/* History Cards */}
        <div className="space-y-5">
          {historyData.map((item) => (
            <div
              key={item.id}
              className="w-full bg-[#F8FBFF] rounded-xl px-5 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm border border-gray-100 
                         transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              {/* Left side */}
              <div className="mb-3 sm:mb-0">
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                  {item.penyakit}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Scanning : {item.tanggal} Pukul {item.waktu}
                </p>
              </div>

              {/* Status badge */}
              <span
                className={`px-3 py-1 text-xs sm:text-sm rounded-full font-medium border ${
                  item.status === "Sedang"
                    ? "border-pink-500 text-pink-500"
                    : "border-green-500 text-green-500"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default History;
