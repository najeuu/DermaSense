// src/pages/ArticleDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar } from "lucide-react";

// Data sama dengan Article.jsx
const articles = [
  {
    id: 1,
    category: "Skin Healthy",
    title: "Mengenal Skin Barrier, Garda Depan Perlindungan Kulit",
    author: "Janeeva Bell",
    date: "November 3, 2017",
    content:
      "Skin barrier adalah lapisan pelindung kulit yang penting untuk menjaga kelembapan dan melindungi kulit dari iritasi. Jika rusak, kulit bisa jadi kering, sensitif, bahkan muncul jerawat.",
    img: "https://via.placeholder.com/600x400.png?text=Article+Image",
  },
  {
    id: 2,
    category: "Skin Healthy",
    title: "Ringkas Kulit dengan Perawatan yang Benar Tiap Hari",
    author: "Janeeva Bell",
    date: "November 3, 2017",
    content:
      "Merawat kulit tidak harus ribet, cukup dengan rutinitas sederhana setiap hari, kulit bisa tetap sehat dan glowing.",
    img: "https://via.placeholder.com/600x400.png?text=Article+Image",
  },
];

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === parseInt(id));

  if (!article) return <p className="p-6">Artikel tidak ditemukan</p>;

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />

      {/* Detail Article */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-1">
        {/* Category tag */}
        <div className="inline-block mb-4">
          <span className="px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full shadow">
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-snug">
          {article.title}
        </h1>

        {/* Author + Date */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span className="mr-2">{article.author}</span>
          <Calendar size={16} className="mr-1" />
          <span>{article.date}</span>
        </div>

        {/* Image */}
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-64 sm:h-96 object-cover rounded-xl shadow mb-6"
        />

        {/* Content */}
        <p className="text-gray-700 leading-relaxed mb-8">{article.content}</p>

        {/* Back button */}
        <button
          onClick={() => navigate("/article")}
          className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition"
        >
          ← Kembali ke Artikel
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
