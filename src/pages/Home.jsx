import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroImage from '../assets/images/Home.png';
import { ArrowUpRight } from 'lucide-react';
import atopikImage from '../assets/images/atopik.jpg';
import scanImage from '../assets/images/scan.jpg';
import article1 from '../assets/images/article1.jpg';
import article2 from '../assets/images/article2.jpg';
import article3 from '../assets/images/article3.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="font-poppins bg-pageBg min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-[500px] sm:h-[600px] md:h-[695px] bg-cover bg-center flex items-center justify-end px-4 sm:px-8 md:px-16"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-[480px] text-right">
          <h1 className="font-bold text-[24px] sm:text-[28px] md:text-[36px] leading-snug md:leading-[100%] tracking-[1px] text-white mb-4 sm:mb-6">
            Identify skin issues with just a few taps. Fast, secure, and dermatologist-backed.
          </h1>
          <a
            href="#main-fitur"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById('main-fitur');
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center justify-center gap-2 w-[180px] sm:w-[200px] md:w-[220px] h-[36px] rounded-[6px] bg-white text-primary font-semibold text-sm hover:bg-gray-100 transition"
          >
            Swipe Up Sekarang
            <ArrowUpRight size={18} className="text-primary" />
          </a>
        </div>
      </section>

      {/* Main Fitur Section */}
      <section id="main-fitur" className="p-4 sm:p-8 md:p-16 scroll-mt-20">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          <span className="text-primary">Main</span> <span className="text-[#4C4C4C]">Fitur</span>
        </h3>
        <p className="text-textDark mb-6 sm:mb-8">
          Identifikasi masalah kulitmu secara instan, dibantu oleh ahli kulit. Fitur kami yang ada
          di bawah ini:
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Kotak Dermatologist */}
          <div className="bg-white rounded-[14px] shadow hover:shadow-lg transition overflow-hidden w-full sm:w-[456px]">
            <img
              src={atopikImage}
              alt="Dermatologist Atopic"
              className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col justify-between h-[192px] sm:h-[192px]">
              <div>
                <h4 className="font-semibold mb-2 text-textDark">Dermatologist Atopic</h4>
                <p className="text-textDark mb-4">
                  Aplikasi ini membantu Anda memahami kondisi kulit Anda dengan cepat.
                </p>
              </div>
              <Link
                to="/article"
                className="self-end bg-primary text-white rounded-[7px] hover:bg-teal-600 transition text-center w-[100px] sm:w-[114px] h-[30px] leading-[30px]"
              >
                See Now
              </Link>
            </div>
          </div>

          {/* Kotak Skin Scan */}
          <div className="bg-white rounded-[14px] shadow hover:shadow-lg transition overflow-hidden w-full sm:w-[456px]">
            <img src={scanImage} alt="Skin Scan" className="w-full h-48 object-cover" />
            <div className="p-5 flex flex-col justify-between h-[192px] sm:h-[192px]">
              <div>
                <h4 className="font-semibold mb-2 text-textDark">Skin Scan</h4>
                <p className="text-textDark mb-4">
                  Cek kesehatan kulit Anda dengan alat canggih dan mudah digunakan.
                </p>
              </div>
              <Link
                to="/scan"
                className="self-end bg-primary text-white rounded-[7px] hover:bg-teal-600 transition text-center w-[100px] sm:w-[114px] h-[30px] leading-[30px]"
              >
                See Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Article Section */}
      <section className="p-4 sm:p-8 md:p-16 bg-[#FCFFFE]">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary">Article</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center max-w-[1200px] mx-auto px-2 sm:px-4">
          {[
            {
              image: article1,
              category: 'Skin Healthy',
              title: 'Chai-biscuit morning habit is killing your gut health says health coach',
              author: 'Jerome Bell',
              date: 'November 7, 2017',
            },
            {
              image: article2,
              category: 'Skin Healthy',
              title:
                'Dokter Spesialis UGM Beri Tips Cegah Penularan Penyakit Kulit dari Pembelian Baju Bekas',
              author: 'Jerome Bell',
              date: 'November 7, 2017',
            },
            {
              image: article3,
              category: 'Skin Healthy',
              title:
                'Unilever Indonesia Hadirkan Sains dan Teknologi untuk Kesehatan Kulit dan Kulit Kepala',
              author: 'Jerome Bell',
              date: 'November 7, 2017',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden w-full"
            >
              <img src={item.image} alt="Img" className="w-full h-40 sm:h-48 object-cover" />
              <div className="p-4 flex flex-col justify-between h-[179px] sm:h-[191px]">
                <span className="text-sm font-medium text-primary bg-[#F1FFF9] px-3 py-1 rounded flex items-center justify-center w-max mb-2">
                  {item.category}
                </span>
                <h4 className="font-semibold text-textDark mb-2 text-sm">{item.title}</h4>
                <div className="flex items-center justify-between text-xs text-textGrayLight">
                  <span>{item.author}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6 sm:mt-8">
          <Link
            to="/article"
            className="border border-primary text-primary px-4 sm:px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition"
          >
            Read More
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
