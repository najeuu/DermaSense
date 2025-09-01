import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, User, ArrowLeft, Clock, ChevronLeft, ChevronRight } from "lucide-react";

import a1 from "../assets/images/a1.png";
import a2 from "../assets/images/a2.png";
import a7 from "../assets/images/a7.png";
import a41 from "../assets/images/a4.1.png"; 
import a51 from "../assets/images/a5.1.png";
import a61 from "../assets/images/a6.1.png";


import obat1 from "../assets/images/obat1.png";
import obat2 from "../assets/images/obat2.png";
import obat3 from "../assets/images/obat3.png";
import obat4 from "../assets/images/obat4.png"


// Data sama dengan Article.jsx
const articles = [
  {
    id: 1,
    category: "Skin Healthy",
    title: "Mengenal Skin Barrier, Garda Depan Pelindung Kulit",
    author: "dr. Merry Dame Cristy Pane",
    date: "April 27, 2023",
    readTime: "5 min read",
    content: {
      intro: "Skin barrier merupakan lapisan terluar kulit yang berfungsi melindungi kulit dan tubuh. Garda terdepan pelindung kulit ini bisa saja rusak karena beberapa hal sehingga menimbulkan berbagai masalah kulit. Oleh sebab itu, kesehatannya perlu dijaga dengan baik.",
      sections: [
        {
          title: "Apa itu Skin Barrier?",
          content:
            "Kulit terdiri dari beberapa lapisan, mulai dari epidermis, dermis, dan hipodermis. Skin barrier atau stratum korneum terletak di lapisan paling atas epidermis. Jaringan skin barrier tersusun oleh kolesterol, asam lemak, dan ceramide.\n\nSkin barrier memiliki peran yang sangat penting dalam menjaga kesehatan kulit, yaitu melindungi kulit dari kerusakan akibat polusi, sinar ultraviolet, zat kimia, kuman, dan bakteri, serta menjaga kelembapan kulit.",
        },
        {
          title: "Penyebab Rusaknya Skin Barrier",
          list: [
            "Lingkungan yang terlalu lembab atau kering",
            "Terlalu sering terkena sinar UV tanpa perlindungan",
            "Terpapar alergen, seperti debu atau serbuk sari",
            "Bahan kimia keras, misalnya kaporit",
            "Terlalu sering mencuci wajah",
            "Over-exfoliation (terlalu sering eksfoliasi)",
            "Produk skincare yang tidak tepat atau mengandung merkuri",
            "Mandi air panas terlalu sering",
            "Stres, cedera, penuaan",
            "Riwayat dermatitis atopik dan psoriasis",
            "Obat-obatan tertentu (kortikosteroid)",
            "Pola hidup tidak sehat: merokok, alkohol, kurang tidur, makanan tidak sehat",
            "Penyakit tertentu, seperti diabetes",
          ],
        },
        {
          title: "Gejala Skin Barrier Rusak",
          list: [
            "Kulit kasar, tebal, gatal, bersisik",
            "Kulit pecah-pecah dan berkerut",
            "Perubahan warna kulit",
            "Sensasi kulit tertarik",
            "Muncul jerawat atau masalah kulit lain",
          ],
        },
        {
          title: "Cara Menjaga Kesehatan Skin Barrier",
          list: [
            "Pilih skincare dengan bahan lembut, tanpa alkohol/pewangi, pH sesuai kulit",
            "Gunakan skincare yang mengandung ceramide, hyaluronic acid, glycerin, atau petrolatum",
            "Pakai skincare dengan minyak alami dari tumbuhan (jojoba, kelapa, almond, zaitun, bunga matahari)",
          ],
        },
        {
          title: "Kesimpulan",
          content:
            "Dengan menjaga skin barrier secara konsisten, kulit akan lebih sehat, lembap, dan terlindungi. Penting untuk memahami faktor-faktor yang dapat merusak skin barrier dan mengambil langkah preventif untuk menjaga kesehatannya.",
        },
      ],
      references: [
        "Lin, T. K., Zhong, L., & Santiago, J. L. (2017). Anti-Inflammatory and Skin Barrier Repair Effects...",
        "Danby, et al (2020). The RESTORE Study Phase 1...",
        "Kanwar A. J. (2018). Skin Barrier Function...",
        "Mori, et al. (2019). Efficacy of a Moisturizer...",
        "Cleveland Clinic (2021). Epidermis.",
        "Mayo Clinic (2019). Healthy Lifestyle...",
        "Joy, R. Healthline (2020). What to Know About Your Skin Barrier...",
        "Sreenivas, S. WebMD (2021). What to Know About Your Skin Barrier...",
      ],
    },
    img: a1,
  },
  {
    id: 2,
    category: "Skin Healthy",
    title: "Sering Merasa Gatal-gatal? Bisa Jadi Tanda Awal Penyakit Liver",
    author: "Suci Risanti Rahmadania",
    date: "July 11, 2025",
    readTime: "6 min read",
    content: {
      intro:
        "Hati atau liver adalah organ penting yang berfungsi sebagai sistem detoksifikasi alami tubuh. Tanpa liver, tubuh tidak dapat menjalankan berbagai proses vital untuk bertahan hidup. Organ besar yang menyerupai bola sepak ini terletak di bagian kanan atas perut, tepat di bawah tulang rusuk.",
      sections: [
        {
          title: "Fungsi Liver dalam Tubuh",
          content:
            "Liver memainkan peran penting dalam berbagai fungsi tubuh, termasuk membuang limbah, membantu pencernaan, menyaring darah, dan menetralisir racun.\n\n\"Pada dasarnya, apa pun yang masuk ke dalam tubuh, mulai dari obat-obatan, alkohol, hingga suplemen, semuanya akan diproses oleh liver,\" jelas dr Lisa Ganjhu, spesialis hepatologi dan gastroenterologi di NYU Langone Health.\n\nSelain itu, nutrisi dari makanan dipecah dan dimetabolisme oleh liver menjadi komponen yang dibutuhkan tubuh, seperti asam amino. Enzim liver juga bertugas mengurai alkohol dan mengeluarkan zat beracun dari sistem tubuh. Menariknya, liver merupakan satu-satunya organ internal yang memiliki kemampuan regeneratif.",
        },
        {
          title: "Penyebab Penyakit Liver",
          content:
            "Penyakit liver bisa disebabkan oleh berbagai faktor, mulai dari faktor genetik, gangguan autoimun, masalah metabolisme, penyumbatan saluran empedu, infeksi virus seperti hepatitis, hingga penyalahgunaan alkohol dan obesitas.\n\nJika tidak ditangani, penyakit liver bisa menjadi kronis dan menyebabkan fibrosis, yaitu pengerasan liver akibat penumpukan jaringan parut yang terjadi saat liver berusaha memperbaiki kerusakan. Dalam jangka panjang, kondisi ini bisa berkembang menjadi sirosis, yaitu jaringan parut yang lebih parah dan permanen.",
        },
        {
          title: "Gatal sebagai Tanda Awal Penyakit Liver",
          content:
            "Tanda dan gejala penyakit liver sering kali tidak tampak jelas, terutama pada tahap awal. Oleh karena itu, para ahli merekomendasikan pemeriksaan kesehatan secara rutin untuk membantu mendeteksi gangguan fungsi liver sedini mungkin.\n\nKulit yang terasa gatal tanpa disertai ruam, atau dikenal sebagai pruritus, dapat menjadi gejala gangguan liver. Kondisi ini bisa terjadi akibat penumpukan garam empedu dalam darah yang disebabkan oleh kerusakan liver.\n\n\"Sering kali rasa gatal ini justru memburuk di malam hari karena berbagai faktor. Penderitanya mungkin merasa baik-baik saja di siang hari, tetapi saat malam tiba, gatalnya bisa sangat mengganggu dan sulit dihentikan,\" ujar Sengupta.",
        },
        {
          title: "Cara Mengatasi Gatal - Hindari Menggaruk",
          content:
            "Menggaruk area kulit yang gatal dapat memperparah kondisi dan meningkatkan risiko infeksi. Untuk mencegah hal tersebut, disarankan menjaga kuku tetap pendek.",
          list: [
            "Gunakan air hangat atau dingin saat mandi, bukan air panas",
            "Hindari berada terlalu lama di tempat yang panas atau terkena sinar matahari langsung",
            "Pilih sabun lembut dan bebas pewangi",
            "Gunakan pelembap yang ringan, bebas pewangi, dan cocok untuk kulit sensitif",
            "Kompres area yang gatal dengan kain dingin dan basah",
            "Jauhkan kulit dari zat-zat atau bahan kimia yang berpotensi menyebabkan iritasi",
            "Kenakan sarung tangan saat menggunakan produk pembersih",
            "Pilih pakaian yang longgar dan menyerap keringat",
            "Gunakan humidifier (pelembap udara) selama musim dingin",
          ],
        },
        {
          title: "Penggunaan Obat Anti Gatal",
          content:
            "Untuk gatal ringan yang terlokalisasi, krim berbahan dasar air dengan kandungan 1 persen mentol dapat membantu meredakan rasa tidak nyaman. Selain itu, obat topikal yang dijual bebas juga bisa digunakan untuk mengurangi gatal, terutama pada kondisi kulit tertentu.\n\nMeski begitu, dosis dan penggunaan obat sebaiknya mengikuti anjuran dokter. Jika sedang dalam pengawasan medis, sebaiknya informasikan kepada dokter terkait penggunaan produk tersebut agar tidak terjadi interaksi atau efek samping yang tidak diinginkan.",
        },
      ],
      references: [
        "dr Lisa Ganjhu, NYU Langone Health - TODAY.com (2025)",
        "Sengupta, Hepatology Specialist (2025)",
        "detikHealth - Medical Review (2025)",
        "Primary Biliary Cirrhosis Research (2025)",
        "Primary Sclerosing Cholangitis Studies (2025)",
        "Intrahepatic Cholestasis Medical Guidelines (2025)",
      ],
    },
    img: a2,
  },
  {
    id: 3,
    category: "Skin Healthy",
    title: "7 Rekomendasi Obat Biduran yang Ampuh Redakan Gatal pada Kulit",
    author: "dr. Fitria Agustina",
    date: "Agustus 15, 2025",
    readTime: "7 min read",
    content: {
      intro:
        "Biduran (urtikaria) merupakan reaksi kulit yang memicu munculnya ruam menonjol warna kemerahan disertai rasa gatal. Kondisi ini dapat sangat mengganggu aktivitas sehari-hari dan memerlukan penanganan yang tepat. Faktor risikonya beragam, mulai dari alergi makanan, stres, perubahan suhu ekstrem, hingga gigitan serangga. Berikut adalah rekomendasi obat biduran yang paling ampuh untuk membantu meredakan gejalanya dengan aman dan efektif.",
      sections: [
        {
          title: "Apa itu Biduran (Urtikaria)?",
          content:
            "Biduran atau urtikaria adalah kondisi kulit yang ditandai dengan munculnya bentol-bentol merah yang menonjol dan terasa gatal. Bentol-bentol ini dapat muncul di berbagai bagian tubuh dan umumnya hilang dalam beberapa jam hingga beberapa hari.\n\nBiduran dapat dibedakan menjadi dua jenis utama: akut (berlangsung kurang dari 6 minggu) dan kronis (berlangsung lebih dari 6 minggu). Kondisi ini terjadi ketika tubuh melepaskan histamin sebagai respons terhadap alergen atau pemicu lainnya.",
        },
        {
          title: "Penyebab dan Gejala Biduran",
          content:
            "Biduran dapat dipicu oleh berbagai faktor, seperti makanan tertentu (kacang, seafood, telur), obat-obatan, gigitan serangga, stres, perubahan suhu, atau paparan sinar matahari berlebihan.\n\nGejala utama biduran meliputi munculnya bentol-bentol merah yang menonjol, rasa gatal yang intens, bengkak pada area yang terkena, dan dalam kasus yang parah dapat disertai dengan sesak napas atau pembengkakan wajah yang memerlukan penanganan medis segera.",
        },
        {
          title: "Cetirizine 10 mg - Antihistamin Pilihan Utama",
          content:
            "Cetirizine merupakan antihistamin generasi kedua yang bekerja selektif untuk mengatasi berbagai reaksi alergi, termasuk biduran, rinitis alergi, konjungtivitis, dan pruritus (gatal-gatal).\n\n**Keunggulan Cetirizine:**\n• Efek samping mengantuk minimal\n• Bekerja cepat dalam 1-2 jam\n• Durasi kerja hingga 24 jam\n• Aman untuk penggunaan jangka panjang\n\n**Dosis yang Direkomendasikan:**\n• Dewasa dan anak >12 tahun: 10 mg sekali sehari\n• Anak usia 6-12 tahun: 5 mg dua kali sehari\n• Anak usia 2-6 tahun: 2,5 mg dua kali sehari\n\nNomor registrasi BPOM: GKL1902358417A1\nKisaran harga: Rp6.500 – Rp6.700 per strip (10 tablet)",
          img: obat1,
        },
        {
          title: "Incidal-OD - Formula Extended Release",
          content:
            "Incidal-OD mengandung cetirizine dalam formula extended release yang memberikan efek terapeutik lebih lama dan stabil. Obat ini sangat efektif untuk mengatasi rinitis alergi, gatal-gatal, dan berbagai jenis biduran.\n\n**Keunggulan Incidal-OD:**\n• Formula lepas lambat untuk efek yang lebih tahan lama\n• Mengurangi frekuensi minum obat\n• Kontrol gejala yang lebih konsisten\n• Kemasan praktis dalam bentuk kapsul\n\n**Dosis yang Direkomendasikan:**\n• Dewasa dan anak >12 tahun: 10 mg sekali sehari\n• Anak usia 6-12 tahun: 5 mg dua kali sehari\n• Anak usia 2-6 tahun: 2,5 mg dua kali sehari\n\nNomor registrasi BPOM: DTL9902001301A1\nKisaran harga: Rp21.900 per strip (4 kapsul)",
          img: obat2,
        },
        {
          title: "Cetirizine Sirup - Pilihan untuk Anak-anak",
          content:
            "Cetirizine dalam bentuk sirup merupakan pilihan terbaik untuk anak-anak yang kesulitan menelan tablet atau kapsul. Formula sirup memiliki rasa yang lebih dapat diterima oleh anak-anak dan dosisnya mudah disesuaikan.\n\n**Keunggulan Cetirizine Sirup:**\n• Mudah diberikan pada anak-anak\n• Penyerapan lebih cepat dibanding tablet\n• Dosis dapat disesuaikan dengan tepat\n• Rasa yang lebih disukai anak-anak\n\n**Dosis yang Direkomendasikan:**\n• Dewasa dan anak >12 tahun: 10 mg (2 sendok teh) sekali sehari\n• Anak usia 6-12 tahun: 5 mg (1 sendok teh) dua kali sehari\n• Anak usia 2-6 tahun: 2,5 mg (½ sendok teh) dua kali sehari\n\nNomor registrasi BPOM: GKL1818831037A1\nKisaran harga: Rp5.700 – Rp35.200 per botol (60 ml)",
          img: obat3,
        },
        {
          title: "Alloris (Loratadine) - Alternatif Non-Sedatif",
          content:
            "Alloris mengandung Loratadine, antihistamin non-sedatif dengan durasi kerja panjang yang sangat efektif untuk mengatasi biduran dan rinitis alergi. Obat ini merupakan pilihan yang baik untuk pasien yang memerlukan aktivitas mental yang optimal.\n\n**Keunggulan Alloris:**\n• Tidak menyebabkan kantuk\n• Durasi kerja 24 jam\n• Tidak berinteraksi dengan alkohol\n• Aman untuk pengemudi dan pekerja yang memerlukan konsentrasi tinggi\n\n**Dosis yang Direkomendasikan:**\n• Dewasa: 10 mg sekali sehari atau 5 mg dua kali sehari\n• Anak >12 tahun: 10 mg sekali sehari\n• Anak 2-12 tahun dengan BB <30kg: 5 mg sekali sehari\n• Anak 2-12 tahun dengan BB >30kg: 10 mg sekali sehari\n\nNomor registrasi BPOM: DKL9322214710A1\nKisaran harga: Rp67.800 per strip (10 tablet)",
          img: obat4,
        },
        {
          title: "Tips Penggunaan Obat Biduran yang Aman",
          content:
            "Untuk mendapatkan hasil maksimal dari pengobatan biduran, perhatikan beberapa hal penting berikut:",
          list: [
            "Konsumsi obat secara teratur sesuai dosis yang dianjurkan, jangan berhenti mendadak",
            "Minum obat bersamaan dengan makanan jika mengalami gangguan lambung",
            "Hindari mengonsumsi alkohol selama pengobatan",
            "Jangan mengemudi atau mengoperasikan mesin berat jika merasa mengantuk",
            "Catat makanan atau faktor pemicu untuk menghindari kekambuhan",
            "Konsultasi dengan dokter jika gejala tidak membaik dalam 3-7 hari",
            "Beri tahu dokter jika sedang hamil, menyusui, atau memiliki riwayat penyakit tertentu",
            "Simpan obat di tempat sejuk dan kering, jauh dari jangkauan anak-anak",
          ],
        },
        {
          title: "Kapan Harus Segera ke Dokter?",
          content:
            "Meskipun biduran umumnya tidak berbahaya, ada beberapa kondisi yang memerlukan penanganan medis segera:",
          list: [
            "Sesak napas, kesulitan menelan, atau pembengkakan wajah dan tenggorokan",
            "Biduran disertai demam tinggi, mual, atau muntah",
            "Gejala memburuk meski sudah menggunakan obat selama beberapa hari",
            "Biduran muncul berulang dalam jangka waktu lama (lebih dari 6 minggu)",
            "Terdapat tanda-tanda infeksi seperti nanah atau area yang terasa hangat",
            "Biduran muncul setelah mengonsumsi obat baru",
            "Anak mengalami biduran untuk pertama kali",
          ],
        },
        {
          title: "Pencegahan dan Perawatan Tambahan",
          content:
            "Selain menggunakan obat, beberapa langkah pencegahan dapat membantu mengurangi risiko kekambuhan biduran:",
          list: [
            "Identifikasi dan hindari pemicu alergi yang sudah diketahui",
            "Gunakan pakaian yang longgar dan berbahan lembut",
            "Kompres dingin pada area yang gatal untuk meredakan gejala",
            "Hindari menggaruk area yang terkena untuk mencegah infeksi",
            "Kelola stres dengan baik melalui olahraga atau meditasi",
            "Jaga kebersihan lingkungan dari debu dan tungau",
            "Konsumsi makanan bergizi untuk menjaga daya tahan tubuh",
            "Gunakan pelembap kulit yang bebas pewangi dan hipoalergenik",
          ],
        },
      ],
      references: [
        "American College of Allergy, Asthma & Immunology (2025). Urticaria (Hives) - Diagnosis and Management",
        "American Academy of Dermatology (2025). Clinical Guidelines for Chronic Urticaria Treatment",
        "Cleveland Clinic (2025). Hives: Causes, Symptoms, and Treatment Options",
        "Medical News Today (2025). What Causes Hives and How to Identify It? - Updated Guidelines",
        "Mayo Clinic (2025). Urticaria Diagnosis and Treatment - Evidence-Based Approach",
        "WebMD (2025). Hives Causes and Treatment - Comprehensive Review",
        "Cochrane Database of Systematic Reviews (2024). H1-antihistamines for chronic spontaneous urticaria - Updated Meta-analysis",
        "Journal of Allergy and Clinical Immunology (2025). New Treatment Approaches for Chronic Urticaria",
      ],
    },
    img: a7,
  },
  {
  id: 4,
  category: "Skin Healthy",
  title: "Beragam Cara Mengatasi Gatal-Gatal pada Kulit",
  author: "dr. Sienny Agustin",
  date: "Juni 25, 2022",
  readTime: "8 min read",
  img: a41, // kalau belum ada gambar, bisa pakai placeholder atau kosongkan dulu
  content: {
    intro:
      "Gatal-gatal pada kulit adalah kondisi yang umum terjadi, terutama pada lansia. Cara mengatasi gatal-gatal pada kulit bisa dilakukan dengan mandi dan mengoleskan pelembap, hingga menggunakan obat-obatan dari dokter.",

    sections: [
      {
        title: "Penyebab Gatal-Gatal pada Kulit",
        content:
          "Gatal-gatal bisa terjadi pada satu area kulit atau bahkan pada seluruh tubuh. Kondisi ini bisa disebabkan oleh kulit kering, alergi, infeksi, gigitan serangga, scabies atau kudis, psoriasis atau dermatitis atopik. Selain itu, gatal-gatal pada kulit juga bisa disebabkan oleh kondisi yang lebih serius, seperti anemia, penyakit ginjal, diabetes, atau penyakit hati.",
      },
      {
        title: "Kapan Perlu ke Dokter?",
        content:
          "Gatal-gatal pada kulit dapat sembuh dengan sendirinya atau diredakan dengan perawatan rumahan. Namun, gatal yang sampai mengganggu aktivitas sehari-hari memerlukan penanganan dari dokter.",
      },
      {
        title: "Cara Mengatasi Gatal pada Kulit di Rumah",
        content:
          "Umumnya gatal-gatal pada kulit akan membaik dalam waktu 2–6 minggu. Namun, keluhan ini sebaiknya tetap diatasi, terutama jika sudah berlangsung lama dan mengganggu aktivitas sehari-hari.",
        list: [
          "Kompres air dingin selama 10 menit untuk meredakan gatal.",
          "Berendam dengan oatmeal koloid (colloidal oatmeal) selama 10–15 menit.",
          "Mandi menggunakan air bersuhu ruang untuk menjaga kelembapan kulit.",
          "Gunakan pelembap bebas pewangi segera setelah mandi.",
          "Beberapa bahan alami, seperti daun herbal, bisa dimanfaatkan meski efektivitasnya masih perlu diteliti.",
        ],
      },
      {
        title: "Cara Mengatasi Gatal dengan Obat Medis",
        content:
          "Jika gatal tidak kunjung membaik dalam waktu 2 minggu setelah perawatan di rumah, Anda disarankan pergi ke dokter kulit. Dokter akan memeriksa penyebab gatal dan memberikan terapi sesuai kondisi.",
        list: [
          "Obat oral: antihistamin, antijamur, antibiotik, antidepresan, antiparasit.",
          "Obat topikal: krim antijamur, krim antidepresan (doxepine), krim permethrin, krim zinc oxide, krim anestesi.",
        ],
      },
      {
        title: "Cara Mencegah Gatal-Gatal pada Kulit",
        list: [
          "Hindari mandi menggunakan air panas terlalu sering.",
          "Gunakan produk perawatan kulit tanpa pewangi.",
          "Pilih pakaian berbahan lembut.",
          "Kelola stres dengan baik.",
        ],
      },
    ],

    references: [
      "Legat, F. J. (2021). Itch in Atopic Dermatitis–What Is New?. Frontiers in Medicine, 8, pp. 629.",
      "American Academy of Dermatology Association. How to Relieve Itchy Skin.",
      "Cleveland Clinic (2021). Home Remedies for Itchy Skin.",
      "Mayo Clinic (2021). Itchy Skin (Pruritus).",
      "Ellis, M. Healthline (2022). What’s Causing Your Itchy Skin? (with Pictures).",
      "DiLonardo, M. WebMD (2021). Oatmeal Baths for Itchy Skin.",
    ],
  },
},
{
  id: 5,
  category: "Skin Healthy",
  title: "Gatal, Kenali Penyebab dan Tips Mengatasinya",
  author: "Suci Risanti Rahmadania - detikHealth",
  date: "Juli 11, 2025",
  readTime: "10 min read",
  img: a51,
  content: {
    intro:
      "Hati atau liver adalah organ penting yang berfungsi sebagai sistem detoksifikasi alami tubuh. Liver memainkan peran penting dalam berbagai fungsi tubuh, termasuk membuang limbah, membantu pencernaan, menyaring darah, dan menetralisir racun.",

    sections: [
      {
        title: "Fungsi Penting Liver",
        content:
          "Liver memproses obat-obatan, alkohol, dan suplemen, serta memetabolisme nutrisi dari makanan menjadi komponen penting bagi tubuh. Liver juga satu-satunya organ internal yang mampu meregenerasi diri.",
      },
      {
        title: "Penyebab Penyakit Liver",
        content:
          "Penyakit liver dapat disebabkan oleh faktor genetik, autoimun, metabolisme, penyumbatan saluran empedu, infeksi virus (misalnya hepatitis), penyalahgunaan alkohol, serta obesitas. Jika tidak ditangani, dapat berkembang menjadi fibrosis atau sirosis.",
      },
      {
        title: "Gatal sebagai Tanda Awal Penyakit Liver",
        content:
          "Kulit yang terasa gatal tanpa ruam (pruritus) bisa menjadi gejala gangguan liver akibat penumpukan garam empedu. Kondisi ini sering memburuk di malam hari dan umum terkait dengan sirosis bilier primer (PBC), kolangitis sklerosis primer (PSC), serta kolestasis intrahepatik pada kehamilan.",
      },
      {
        title: "Cara Mengatasi Gatal",
        list: [
          "Hindari menggaruk area kulit yang gatal.",
          "Gunakan air hangat atau dingin saat mandi, bukan air panas.",
          "Hindari terlalu lama di tempat panas atau sinar matahari langsung.",
          "Gunakan sabun lembut bebas pewangi.",
          "Pakai pelembap ringan, bebas pewangi, dan cocok untuk kulit sensitif.",
          "Kompres dengan kain dingin pada area yang gatal.",
          "Jauhkan kulit dari zat kimia penyebab iritasi.",
          "Gunakan sarung tangan saat memakai bahan pembersih atau kimia keras.",
          "Kenakan pakaian longgar yang menyerap keringat.",
          "Gunakan humidifier saat udara kering.",
        ],
      },
      {
        title: "Penggunaan Obat Anti Gatal",
        content:
          "Untuk gatal ringan yang terlokalisasi, krim berbahan dasar air dengan kandungan 1% mentol dapat membantu. Obat topikal juga bisa digunakan, tetapi sebaiknya sesuai anjuran dokter untuk menghindari interaksi obat atau efek samping.",
      },
    ],

    references: [
      "Lisa Ganjhu, MD - NYU Langone Health",
      "Sengupta, A. - Today.com (2025)",
      "detikHealth, 11 Juli 2025",
    ],
  },
},
{
  id: 6,
  category: "Skin Healthy",
  title: "Hati-Hati, Ini Gejala Penyakit Kulit Kronis yang Bisa Dialami Orang Dewasa",
  author: "dr. Rizal Fadli",
  date: "Agustus 6, 2021",
  readTime: "12 min read",
  img: a61,
  content: {
    intro:
      "Penyakit kulit kronis bersifat permanen dan tidak dapat sembuh sepenuhnya. Beberapa jenisnya, seperti eksim hingga melanoma, dapat terjadi pada orang dewasa dan memerlukan perawatan yang tepat untuk mengendalikan gejalanya.",

    sections: [
      {
        title: "Apa Itu Penyakit Kulit Kronis?",
        content:
          "Penyakit kulit dapat terjadi pada siapa saja, baik anak-anak maupun orang dewasa. Pada orang dewasa, kebanyakan jenis penyakit kulit yang terjadi biasanya bersifat sementara dan mudah hilang setelah pengobatan. Namun, ada juga penyakit kulit jangka panjang atau kronis yang bersifat permanen, sulit sembuh, dan dapat bertahan seumur hidup. Banyak penyakit kulit permanen memiliki perawatan yang efektif untuk mengelola gejalanya dan mengurangi dampaknya, meski gejalanya bisa kembali kapan saja.",
      },
      {
        title: "Eksim",
        content:
          "Eksim paling sering terjadi pada bayi dan anak-anak, namun bisa berlanjut hingga dewasa. Gejalanya meliputi ruam gatal di wajah, kulit kepala, belakang siku, leher, pergelangan tangan, pergelangan kaki, atau kaki. Ruam bisa menjadi bergelombang, berubah warna, menebal, dan menyebabkan kulit sangat kering secara permanen.",
      },
      {
        title: "Rosacea",
        content:
          "Rosacea adalah penyakit kulit kronis dengan gejala utama kemerahan pada wajah. Lebih sering dialami wanita, biasanya berkembang setelah usia 30 tahun. Gejala lainnya meliputi penebalan kulit, flushing (wajah gelap sementara), pembuluh darah terlihat, jerawat, dan iritasi mata.",
      },
      {
        title: "Psoriasis",
        content:
          "Psoriasis adalah gangguan autoimun yang menyebabkan sel kulit berkembang pesat dan menumpuk di permukaan kulit. Gejalanya berupa bercak merah, bersisik, dan sangat gatal.",
      },
      {
        title: "Vitiligo",
        content:
          "Vitiligo adalah hilangnya pigmentasi kulit, ditandai bercak putih yang sering muncul di area terpapar sinar matahari. Dapat menyebabkan rambut memutih lebih awal. Gejalanya bisa terbatas pada satu area atau menyebar perlahan selama bertahun-tahun.",
      },
      {
        title: "Melanoma",
        content:
          "Melanoma adalah kanker kulit serius yang ditandai tahi lalat dengan bentuk tidak simetris, tepi tidak rata, warna tidak merata, atau perubahan ukuran. Kanker ini dapat menyebar ke bagian tubuh lain dan mengancam jiwa.",
      },
      {
        title: "Kapan Harus ke Dokter?",
        content:
          "Jika kamu mengalami gejala dari salah satu penyakit kulit kronis di atas, segera hubungi dokter untuk memastikan diagnosis dan mendapatkan pengobatan. Sekarang, memeriksakan diri ke dokter semakin mudah dengan aplikasi Halodoc, yang juga menyediakan obat kulit dan produk skincare dari apotek terpercaya.",
      },
    ],

    references: [
      "Medical News Today. Diakses pada 2024. Common skin diseases and conditions.",
      "Healthline. Diakses pada 2024. All About Common Skin Disorders.",
      "Medical News Today. Diakses pada 2024. What is rosacea?",
    ],
  },
}

];

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  React.useEffect(() => {
    const articleIndex = articles.findIndex((a) => a.id === parseInt(id));
    if (articleIndex !== -1) {
      setCurrentArticleIndex(articleIndex);
    }
  }, [id]);

  const currentArticle = articles[currentArticleIndex];

  if (!currentArticle) {
    return (
      <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Artikel Tidak Ditemukan</h2>
            <p className="text-gray-600 mb-6">Maaf, artikel yang Anda cari tidak tersedia.</p>
            <button
              onClick={() => navigate("/article")}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
            >
              Kembali ke Artikel
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-poppins bg-[#FCFFFE] min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/article")}
            className="flex items-center text-gray-600 hover:text-primary transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Artikel</span>
          </button>
          
          <div className="inline-block mb-4">
            <span className="px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full shadow-sm">
              {currentArticle.category}
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {currentArticle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span className="font-medium">{currentArticle.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{currentArticle.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              <span>{currentArticle.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="relative mb-12">
          <img
            src={currentArticle.img}
            alt={currentArticle.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-xl leading-relaxed text-gray-700 font-light border-l-4 border-primary pl-6 py-2 bg-gray-50 rounded-r-lg">
            {currentArticle.content.intro}
          </p>
        </div>

        <div className="space-y-12">
          {currentArticle.content.sections.map((section, index) => (
            <section key={index} className="scroll-mt-24">
              {/* Judul Section */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-primary/20">
                {index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`} {section.title}
              </h2>

              {/* Gambar kalau ada */}
              {section.img && (
                <div className="flex justify-center mb-6">
                  <img
                    src={section.img}
                    alt={section.title}
                    className="max-h-72 object-contain rounded-xl shadow-md"
                  />
                </div>
              )}

              {/* Konten teks */}
              {section.content && (
                <div className="prose prose-lg max-w-none mb-6">
                  {section.content.split("\n\n").map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* List (kalau ada) */}
              {section.list && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                  <ul className="space-y-3">
                    {section.list.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2 mr-4"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* References Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Referensi</h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <ul className="space-y-2">
              {currentArticle.content.references.map((ref, index) => (
                <li key={index} className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-medium">[{index + 1}]</span> {ref}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-green-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Tertarik dengan artikel kesehatan lainnya?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Jelajahi koleksi artikel kesehatan kami yang lain untuk mendapatkan tips dan informasi terbaru seputar kesehatan kulit dan tubuh.
          </p>
          <button
            onClick={() => navigate("/article")}
            className="px-8 py-3 bg-primary text-white rounded-xl shadow-lg hover:bg-primary/80 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Lihat Artikel Lainnya
          </button>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
