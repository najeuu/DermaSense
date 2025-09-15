import a1 from '../assets/images/a1.png';
import a2 from '../assets/images/a2.png';
import a7 from '../assets/images/a7.png';
import a41 from '../assets/images/a4.1.png';
import a51 from '../assets/images/a5.1.png';
import a61 from '../assets/images/a6.1.png';

import obat1 from '../assets/images/obat1.png';
import obat2 from '../assets/images/obat2.png';
import obat3 from '../assets/images/obat3.png';
import obat4 from '../assets/images/obat4.png';

export const articles = [
  {
    id: 1,
    category: 'Nutrition',
    title: 'Manfaat Omega-3 untuk Kesehatan Kulit',
    author: 'Dr. Sarah Johnson',
    date: '2023-04-27',
    readTime: '7 min read',
    img: a1,
    content: {
      intro:
        'Omega-3 adalah jenis asam lemak esensial yang tidak dapat diproduksi sendiri oleh tubuh. Asam lemak ini berperan penting dalam kesehatan kulit, terutama dalam mengurangi peradangan, menjaga kelembapan, dan mendukung regenerasi kulit.',
      sections: [
        {
          title: 'Sumber Omega-3',
          content: 'Omega-3 dapat ditemukan dalam berbagai makanan dan suplemen, di antaranya:',
          list: [
            'Ikan berlemak (salmon, makarel, sarden, tuna)',
            'Biji rami',
            'Chia seed',
            'Kenari',
            'Minyak ikan',
          ],
        },
        {
          title: 'Manfaat Omega-3 untuk Kulit',
          list: [
            'Mengurangi peradangan pada kulit',
            'Meningkatkan kelembapan kulit',
            'Melindungi kulit dari kerusakan akibat sinar UV',
            'Membantu proses penyembuhan luka',
            'Mengurangi gejala psoriasis dan eksim',
          ],
        },
      ],
      references: [
        'Lin, T.K., Zhong, L., & Santiago, J.L. (2017). Anti-Inflammatory and Skin Barrier Repair Effects of Topical Application of Some Plant Oils. International Journal of Molecular Sciences.',
        'Kim, H.H., et al. (2006). Eicosapentaenoic acid inhibits UV-induced MMP-1 expression in human dermal fibroblasts. Journal of Lipid Research.',
      ],
    },
  },
  {
    id: 2,
    category: 'Skincare',
    title: 'Cara Merawat Kulit Sensitif',
    author: 'Dr. Emily Tan',
    date: '2024-02-15',
    readTime: '6 min read',
    img: a2,
    content: {
      intro:
        'Kulit sensitif memerlukan perhatian ekstra dalam perawatan sehari-hari. Penggunaan produk yang salah dapat memicu iritasi, kemerahan, hingga peradangan.',
      sections: [
        {
          title: 'Tips Merawat Kulit Sensitif',
          list: [
            'Gunakan pembersih wajah yang lembut tanpa SLS',
            'Hindari penggunaan alkohol dalam skincare',
            'Gunakan pelembap hipoalergenik',
            'Gunakan sunscreen minimal SPF 30',
            'Uji coba produk baru di area kecil terlebih dahulu',
          ],
        },
      ],
      references: ['American Academy of Dermatology Association. Tips for sensitive skin care.'],
    },
  },
  {
    id: 3,
    category: 'Health',
    title: 'Biduran (Urtikaria): Penyebab, Gejala, dan Pengobatan',
    author: 'Dr. Michael Lee',
    date: '2025-07-11',
    readTime: '8 min read',
    img: a7,
    content: {
      intro:
        'Biduran atau urtikaria adalah kondisi kulit yang ditandai dengan munculnya bentol merah, rasa gatal, dan terkadang disertai pembengkakan. Biduran bisa bersifat akut (hilang dalam beberapa jam atau hari) maupun kronis (berulang dalam waktu lama).',
      sections: [
        {
          title: 'Penyebab Biduran',
          list: [
            'Reaksi alergi (makanan, obat-obatan, gigitan serangga)',
            'Infeksi (virus atau bakteri)',
            'Paparan suhu ekstrem (dingin/panas)',
            'Stres emosional',
            'Penyakit autoimun',
          ],
        },
        {
          title: 'Gejala Biduran',
          list: [
            'Muncul bentol merah atau merah muda di kulit',
            'Rasa gatal intens',
            'Ukuran bentol bervariasi',
            'Bentol bisa berpindah lokasi',
            'Terkadang disertai pembengkakan di wajah, bibir, atau kelopak mata',
          ],
        },
        {
          title: 'Pengobatan Biduran',
          content: 'Pengobatan biduran bergantung pada penyebab dan tingkat keparahan:',
        },
        {
          title: 'Obat Umum untuk Biduran',
          list: [
            'Antihistamin (Cetirizine, Loratadine, Fexofenadine)',
            'Kortikosteroid (Prednison, untuk kasus parah)',
            'Epinephrine (pada reaksi alergi berat/anafilaksis)',
            'Obat pereda gatal topikal',
          ],
        },
        {
          title: 'Contoh Obat untuk Biduran',
          list: ['Cetirizine', 'Loratadine', 'Fexofenadine', 'Prednison'],
          img: [obat1, obat2, obat3, obat4],
        },
      ],
      references: [
        'Zuberbier T, et al. (2018). The EAACI/GA2LEN/EDF/WAO guideline for the definition, classification, diagnosis, and management of urticaria.',
        'Mayo Clinic. Hives and angioedema - Symptoms and causes.',
      ],
    },
  },
  {
    id: 4,
    category: 'Nutrition',
    title: 'Kaitan Pola Makan dengan Kesehatan Kulit',
    author: 'Dr. Amanda Rivera',
    date: '2025-08-15',
    readTime: '9 min read',
    img: a41,
    content: {
      intro:
        'Pola makan berperan penting dalam menjaga kesehatan kulit. Asupan gizi yang seimbang dapat membantu kulit tetap sehat, bercahaya, dan mempercepat regenerasi.',
      sections: [
        {
          title: 'Nutrisi Penting untuk Kulit',
          list: [
            'Vitamin C (antioksidan, merangsang produksi kolagen)',
            'Vitamin E (melindungi dari radikal bebas)',
            'Zinc (membantu penyembuhan luka dan jerawat)',
            'Omega-3 (menjaga kelembapan kulit)',
          ],
        },
        {
          title: 'Makanan yang Perlu Dihindari',
          list: ['Makanan tinggi gula', 'Makanan cepat saji', 'Produk olahan tinggi lemak jenuh'],
        },
      ],
      references: ['Harvard Health Publishing. The role of nutrition in skin health.'],
    },
  },
  {
    id: 5,
    category: 'Skincare',
    title: 'Manfaat Sunscreen untuk Mencegah Penuaan Dini',
    author: 'Dr. Jessica Wong',
    date: '2025-09-15',
    readTime: '5 min read',
    img: a51,
    content: {
      intro:
        'Sunscreen atau tabir surya adalah produk skincare yang berfungsi melindungi kulit dari sinar UV matahari. Paparan sinar UV dapat mempercepat penuaan dini, menyebabkan flek hitam, keriput, dan meningkatkan risiko kanker kulit.',
      sections: [
        {
          title: 'Jenis Sinar UV',
          list: [
            'UVA: Menembus lapisan kulit lebih dalam, menyebabkan penuaan dini',
            'UVB: Menyebabkan kulit terbakar',
            'UVC: Tertahan oleh lapisan ozon',
          ],
        },
        {
          title: 'Manfaat Sunscreen',
          list: [
            'Melindungi kulit dari risiko kanker kulit',
            'Mencegah munculnya flek hitam',
            'Mengurangi risiko keriput dan garis halus',
            'Menjaga warna kulit tetap merata',
          ],
        },
        {
          title: 'Tips Penggunaan',
          list: [
            'Gunakan setiap hari, bahkan saat mendung',
            'Aplikasikan ulang setiap 2 jam',
            'Gunakan sunscreen minimal SPF 30',
          ],
        },
      ],
      references: [
        'Skin Cancer Foundation. Sunscreen: How to Help Protect Your Skin from the Sun.',
      ],
    },
  },
  {
    id: 6,
    category: 'Health',
    title: 'Jerawat: Penyebab dan Cara Mengatasinya',
    author: 'Dr. Kevin Huang',
    date: '2025-09-02',
    readTime: '10 min read',
    img: a61,
    content: {
      intro:
        'Jerawat adalah masalah kulit yang umum terjadi akibat penyumbatan folikel rambut oleh minyak dan sel kulit mati. Kondisi ini sering diperparah oleh faktor hormon, stres, maupun pola makan.',
      sections: [
        {
          title: 'Penyebab Jerawat',
          list: [
            'Produksi minyak berlebih',
            'Penyumbatan pori-pori oleh sel kulit mati',
            'Infeksi bakteri',
            'Perubahan hormon',
            'Faktor genetik',
          ],
        },
        {
          title: 'Cara Mengatasi Jerawat',
          list: [
            'Membersihkan wajah secara teratur',
            'Menggunakan produk skincare non-komedogenik',
            'Menghindari memencet jerawat',
            'Mengatur pola makan sehat',
            'Konsultasi dengan dokter kulit untuk terapi khusus',
          ],
        },
      ],
      references: ['American Academy of Dermatology. Acne: Overview and causes.'],
    },
  },
];
