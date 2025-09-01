import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar } from 'lucide-react';

import a1 from '../assets/images/a1.png';
import a2 from '../assets/images/a2.png';
import a3 from '../assets/images/a3.png';
import a4 from '../assets/images/a4.jpg';
import a5 from '../assets/images/a5.png';
import a6 from '../assets/images/a6.png';

import mainImage from '../assets/images/main.jpg';

const Article = () => {
  const placeholder = mainImage;

  const articles = [
    {
      id: 1,
      category: 'Skin Healthy',
      title: 'Mengenal Skin Barrier, Garda Depan Perlindungan Kulit',
      author: 'dr. Merry Dame Cristy Pane',
      date: ' 27 April 2023',
      content:
        'Skin barrier merupakan lapisan terluar kulit yang berfungsi melindungi kulit dan tubuh. Garda terdepan pelindung kulit ini bisa saja rusak karena beberapa hal sehingga menimbulkan berbagai masalah kulit. Oleh sebab itu, kesehatannya perlu dijaga dengan baik.',
      img: a1,
    },
    {
      id: 2,
      category: 'Skin Healthy',
      title: 'Menjaga Kesehatan Kulit dengan Perawatan yang Benar Tiap Hari',
      author: 'Diketik oleh : Suci Risanti Rahmadania - detikHealth',
      date: 'Jum’at 11, July 2025 15:30 WIB',
      content:
        'Hati atau liver adalah organ penting yang berfungsi sebagai sistem detoksifikasi alami tubuh. Tanpa liver, tubuh tidak dapat menjalankan berbagai proses vital untuk bertahan hidup. Organ besar yang menyerupai bola sepak ini terletak di bagian kanan atas perut, tepat di bawah tulang rusuk. Liver memainkan peran penting dalam berbagai fungsi tubuh, termasuk membuang limbah, membantu pencernaan, menyaring darah, dan menetralisir racun. ',
      img: a2,
    },
    {
      id: 3,
      category: 'Skin Healthy',
      title: 'Penyakit Kulit, Kenali Berbagai Jenis, Penyebab, dan Cara Mengatasinya',
      author: 'dr. Erlian Dimas SpDV',
      date: '09 Juni 2025',
      content:
        'Biduran urtikaria merupakan reaksi kulit yang memicu munculnya ruam menonjol warna kemerahan. Ruam yang muncul dapat menyebabkan rasa gatal yang mengganggu.Ada berbagai faktor risiko yang memicu seseorang mengalami biduran, mulai dari alergi, stres, suhu ekstrem, hingga gigitan serangga. Mau tahu apa saja rekomendasi obat biduran yang paling ampuh? Berikut ulasannya!',
      img: a3,
    },
    {
      id: 4,
      category: 'Skin Healthy',
      title: 'Beragam Cara Mengatasi Gatal-Gatal pada Kulit',
      author: 'dr. Sienny Agustin',
      date: '25 Juni 2022',
      content:
        'Gatal-gatal pada kulit adalah kondisi yang umum terjadi, terutama pada lansia. Cara mengatasi gatal-gatal pada kulit bisa dilakukan dengan mandi dan mengoleskan pelembap, hingga menggunakan obat-obatan dari dokter.',
      img: a4,
    },
    {
      id: 5,
      category: 'Skin Healthy',
      title: 'Gatal, Kenali Penyebab dan Tips Mengatasinya',
      author: 'Suci Risanti Rahmadania - detikHealth',
      date: 'Jum’at 11, July 2025 15:30 WIB',
      content:
        'Hati atau liver adalah organ penting yang berfungsi sebagai sistem detoksifikasi alami tubuh. Tanpa liver, tubuh tidak dapat menjalankan berbagai proses vital untuk bertahan hidup. Organ besar yang menyerupai bola sepak ini terletak di bagian kanan atas perut, tepat di bawah tulang rusuk. Liver memainkan peran penting dalam berbagai fungsi tubuh, termasuk membuang limbah, membantu pencernaan, menyaring darah, dan menetralisir racun.',
      img: a5,
    },
    {
      id: 6,
      category: 'Treatment',
      title: 'Hati-Hati, Ini Gejala Penyakit Kulit Kronis yang Bisa Dialami Orang Dewasa',
      author: ' dr. Rizal Fadli',
      date: ' 06 Agustus 2021',
      content:
        'Penyakit kulit kronis merupakan penyakit yang bersifat permanen dan tidak dapat sembuh sepenuhnya. Terdapat beberapa jenis penyakit kulit kronis yang dapat terjadi pada orang dewasa, seperti eksim hingga melanoma.',
      img: a6,
    },
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
              Ciri-Ciri Kulitmu Butuh Bantuan Dokter Kulit, Bukan Coba-Coba Skincare Lagi
            </h2>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="mr-2">Dr. Victor Watson</span>
              <Calendar size={16} className="mr-1" />
              <span>November 20, 2024</span>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Menurut dokter spesialis dermatologi, venereologi, dan estetika Dr. Andina Bulan Sari
              dari RS Eka Pekayon, jika sudah mencoba berbagai skincare tapi masalah kulit tidak
              kunjung membaik, sebaiknya segera konsultasi ke dokter spesialis kulit dan kelamin
              untuk penanganan yang tepat.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">Artikel Terbaru</h3>
        <p className="text-gray-600 mb-8">
          Selamat datang di section artikel, berikut merupakan kumpulan beberapa artikel yang telah
          kami buat sedemikian rupa untuk membantu Anda memahami perawatan kulit yang tepat dan
          aman.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((item) => (
            <Link to={`/article/${item.id}`} key={item.id}>
              <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer transform hover:-translate-y-1">
                <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                    {item.category}
                  </span>
                  <h4 className="mt-2 font-semibold text-lg text-gray-800 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{item.content}</p>
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
