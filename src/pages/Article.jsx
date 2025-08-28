// // src/pages/Article.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Calendar } from "lucide-react";

// const Article = () => {
//   const placeholder =
//     "https://via.placeholder.com/600x400.png?text=Article+Image";

//   const articles = [
//     {
//       id: 1,
//       category: "Skin Healthy",
//       title: "Mengenal Skin Barrier, Garda Depan Perlindungan Kulit",
//       author: "Janeeva Bell",
//       date: "November 3, 2017",
//       content:
//         "Skin barrier adalah lapisan pelindung kulit yang penting untuk menjaga kelembapan dan melindungi kulit dari iritasi. Jika rusak, kulit bisa jadi kering, sensitif, bahkan muncul jerawat.",
//       img: placeholder,
//     },
//     {
//       id: 2,
//       category: "Skin Healthy",
//       title: "Ringkas Kulit dengan Perawatan yang Benar Tiap Hari",
//       author: "Janeeva Bell",
//       date: "November 3, 2017",
//       content:
//         "Merawat kulit tidak harus ribet, cukup dengan rutinitas sederhana setiap hari, kulit bisa tetap sehat dan glowing.",
//       img: placeholder,
//     },
//     // ... dst
//   ];

//   return (
//     <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
//       <Navbar />

//       {/* Hero Article */}
//       <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
//         <div className="bg-white shadow rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 items-center">
//           <img
//             src={placeholder}
//             alt="Doctor"
//             className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
//           />
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 leading-snug">
//               Ciri-Ciri Kulitmu Butuh Bantuan Dokter Kulit, Bukan Coba-Coba
//               Skincare Lagi
//             </h2>
//             <div className="flex items-center text-sm text-gray-500 mb-4">
//               <span className="mr-2">Victor Watson</span>
//               <Calendar size={16} className="mr-1" />
//               <span>August 30, 2019</span>
//             </div>
//             <p className="text-gray-700 leading-relaxed">
//               Menurut dokter spesialis dermatologi, venereologi, dan estetika
//               Andina Bulan Sari dari RS Eka Pekayon, untuk mencoba berbagai
//               skincare tapi tidak cocok sebaiknya pergi untuk memeriksakan diri
//               ke dokter DVE (dokter spesialis kulit dan kelamin).
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Latest Articles */}
//       <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
//         <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">
//           Artikel Terbaru
//         </h3>
//         <p className="text-gray-600 mb-8">
//           Selamat datang di section artikel, berikut merupakan kumpulan beberapa
//           artikel yang telah kami buat sedemikian rupa.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {articles.map((item) => (
//             <Link to={`/article/${item.id}`} key={item.id}>
//               <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <span className="text-xs font-semibold text-primary uppercase">
//                     {item.category}
//                   </span>
//                   <h4 className="mt-2 font-semibold text-lg text-gray-800">
//                     {item.title}
//                   </h4>
//                   <p className="text-sm text-gray-500 mt-2">
//                     {item.author} - {item.date}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Article;

// src/pages/Article.jsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar } from "lucide-react";

const Article = () => {
  const placeholder = "https://via.placeholder.com/600x400.png?text=Article+Image";
  
  const articles = [
    {
      id: 1,
      category: "Skin Healthy",
      title: "Mengenal Skin Barrier, Garda Depan Perlindungan Kulit",
      author: "Dr. Andina Sari",
      date: "November 15, 2024",
      content: "Skin barrier adalah lapisan pelindung kulit yang penting untuk menjaga kelembapan dan melindungi kulit dari iritasi eksternal. Ketika skin barrier rusak, kulit menjadi kering, sensitif, dan rentan bermasalah. Pelajari cara merawatnya dengan tepat.",
      img: placeholder,
    },
    {
      id: 2,
      category: "Skin Healthy",
      title: "Rutinitas Skincare Sederhana untuk Kulit Sehat Setiap Hari",
      author: "Dr. Maya Indira",
      date: "November 10, 2024",
      content: "Merawat kulit tidak harus rumit dan mahal. Dengan 4 langkah dasar: cleanser, toner, moisturizer, dan sunscreen, kulit Anda sudah bisa tetap sehat dan glowing setiap hari.",
      img: placeholder,
    },
    {
      id: 3,
      category: "Acne Treatment",
      title: "Jerawat Hormonal vs Jerawat Biasa: Kenali Perbedaannya",
      author: "Dr. Rizki Ananda",
      date: "November 8, 2024",
      content: "Jerawat hormonal memiliki karakteristik dan penanganan yang berbeda dengan jerawat biasa. Mengenali perbedaannya penting agar treatment yang diberikan tepat sasaran dan efektif.",
      img: placeholder,
    },
    {
      id: 4,
      category: "Anti-Aging",
      title: "Retinol untuk Pemula: Panduan Lengkap Penggunaan yang Aman",
      author: "Dr. Sinta Dewi",
      date: "November 5, 2024",
      content: "Retinol adalah holy grail anti-aging, tapi penggunaannya harus hati-hati. Pelajari cara memulai, dosis yang tepat, dan tips menghindari iritasi untuk hasil maksimal.",
      img: placeholder,
    },
    {
      id: 5,
      category: "Sun Protection",
      title: "Mitos dan Fakta Seputar Sunscreen yang Perlu Kamu Tahu",
      author: "Dr. Farah Nabila",
      date: "November 3, 2024",
      content: "Masih banyak mitos keliru tentang sunscreen yang beredar. Mari kita bahas fakta ilmiah tentang SPF, PA+, physical vs chemical sunscreen, dan pentingnya reapply.",
      img: placeholder,
    },
    {
      id: 6,
      category: "Sensitive Skin",
      title: "Kulit Sensitif: Penyebab, Gejala, dan Cara Merawatnya",
      author: "Dr. Linda Kurnia",
      date: "Oktober 30, 2024",
      content: "Kulit sensitif bukan tipe kulit, melainkan kondisi kulit yang bisa dialami siapa saja. Kenali trigger-nya dan pelajari cara merawat kulit sensitif dengan produk yang gentle namun efektif.",
      img: placeholder,
    },
    {
      id: 7,
      category: "Skin Healthy",
      title: "Hidrasi vs Moisturizing: Apa Bedanya dan Kenapa Keduanya Penting?",
      author: "Dr. Ayu Pratiwi",
      date: "Oktober 28, 2024",
      content: "Banyak yang mengira hidrasi dan moisturizing itu sama. Padahal keduanya berbeda dan sama-sama penting untuk kesehatan kulit. Pelajari perbedaannya dan cara mendapatkan keduanya.",
      img: placeholder,
    },
    {
      id: 8,
      category: "Acne Treatment",
      title: "Niacinamide: Bahan Aktif Multifungsi untuk Berbagai Masalah Kulit",
      author: "Dr. Rania Putri",
      date: "Oktober 25, 2024",
      content: "Niacinamide adalah vitamin B3 yang bermanfaat untuk mengontrol minyak, menyamarkan pori-pori, mencerahkan kulit, dan mengurangi inflamasi. Cocok untuk semua jenis kulit termasuk yang sensitif.",
      img: placeholder,
    },
    {
      id: 9,
      category: "Anti-Aging",
      title: "Vitamin C untuk Kulit: Manfaat, Jenis, dan Cara Penggunaan",
      author: "Dr. Karin Melati",
      date: "Oktober 22, 2024",
      content: "Vitamin C adalah antioksidan kuat yang melindungi kulit dari radikal bebas, merangsang produksi kolagen, dan mencerahkan kulit. Pilih jenis yang tepat sesuai kondisi kulit Anda.",
      img: placeholder,
    },
    {
      id: 10,
      category: "Skin Healthy",
      title: "Double Cleansing: Apakah Perlu dan Bagaimana Cara yang Benar?",
      author: "Dr. Desi Ramadhani",
      date: "Oktober 20, 2024",
      content: "Double cleansing populer dalam K-Beauty, tapi apakah semua orang memerlukannya? Pelajari konsep oil cleansing dan water-based cleansing, plus tips memilih produk yang tepat.",
      img: placeholder,
    },
    {
      id: 11,
      category: "Sun Protection",
      title: "Cara Memilih Sunscreen yang Tepat Sesuai Jenis Kulit",
      author: "Dr. Putri Amanda",
      date: "Oktober 18, 2024",
      content: "Tidak semua sunscreen cocok untuk semua jenis kulit. Kulit berminyak, kering, sensitif, atau berjerawat memiliki kebutuhan berbeda. Pelajari cara memilih sunscreen yang tepat untuk Anda.",
      img: placeholder,
    },
    {
      id: 12,
      category: "Sensitive Skin",
      title: "Bahan-Bahan Skincare yang Harus Dihindari Kulit Sensitif",
      author: "Dr. Vina Maharani",
      date: "Oktober 15, 2024",
      content: "Kulit sensitif perlu extra hati-hati dalam memilih produk skincare. Kenali bahan-bahan yang berpotensi menyebabkan iritasi dan alternatif yang lebih gentle untuk kulit Anda.",
      img: placeholder,
    }
  ];

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Article */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white shadow rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 items-center">
          <img
            src={placeholder}
            alt="Doctor"
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-md"
          />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 leading-snug">
              Ciri-Ciri Kulitmu Butuh Bantuan Dokter Kulit, Bukan Coba-Coba
              Skincare Lagi
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="mr-2">Dr. Victor Watson</span>
              <Calendar size={16} className="mr-1" />
              <span>November 20, 2024</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Menurut dokter spesialis dermatologi, venereologi, dan estetika
              Dr. Andina Bulan Sari dari RS Eka Pekayon, jika sudah mencoba berbagai
              skincare tapi masalah kulit tidak kunjung membaik, sebaiknya segera
              konsultasi ke dokter spesialis kulit dan kelamin untuk penanganan yang tepat.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">
          Artikel Terbaru
        </h3>
        <p className="text-gray-600 mb-8">
          Selamat datang di section artikel, berikut merupakan kumpulan beberapa
          artikel yang telah kami buat sedemikian rupa untuk membantu Anda memahami
          perawatan kulit yang tepat dan aman.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((item) => (
            <Link to={`/article/${item.id}`} key={item.id}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer transform hover:-translate-y-1">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h4 className="mt-2 font-semibold text-lg text-gray-800 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {item.content}
                  </p>
                  <div className="text-xs text-gray-500 mt-3 flex items-center">
                    <span className="mr-2">{item.author}</span>
                    <span>•</span>
                    <span className="ml-2">{item.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Article;