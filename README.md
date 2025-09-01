# Dermasense 🩺

**Dermasense** adalah aplikasi web untuk mendeteksi penyakit kulit secara otomatis. Pengguna dapat mengunggah foto kulit, dan sistem akan menganalisis gambar tersebut untuk memberikan diagnosa beserta solusi penanganan.  

Aplikasi ini menggabungkan dua teknologi utama:  

1. **YOLO (You Only Look Once)** – untuk mendeteksi tingkat keparahan, ketebalan kulit, dan gejala gatal.  
2. **Analisis pixel dengan Sharp** – untuk menghitung persentase kemerahan dan likenifikasi (penebalan kulit).  

Hasil deteksi disajikan secara ringkas dan juga disimpan sebagai riwayat pengguna, termasuk gambar asli dan gambar berlabel. Dermasense menggunakan **Node.js**, **Express**, **MongoDB**, dan **TensorFlow.js** di backend.  

---

## 🚀 Instalasi

1. Clone repositori:

```bash
git clone https://github.com/najeuu/dermasense.git
```

2. Masuk ke direktori proyek:

```bash
cd dermasense
```

3. Install dependensi:

```bash
npm install
```

---

## 📦 Scripts

| Perintah            | Keterangan                                              |
|---------------------|----------------------------------------------------------|
| `npm run dev`       | Menjalankan server development menggunakan Vite          |
| `npm run build`     | Membuat build production                                 |
| `npm run preview`   | Menjalankan preview server dari hasil build              |
| `npm run lint`      | Mengecek format kode dengan ESLint                       |

---

## 📁 Struktur Proyek

```
agridetect/
├── public/                     # File publik 
│
├── src/                        # Kode sumber utama
│   ├── assets/                 # Berisi gambar, ikon, atau file statis lainnya
│   ├── layouts/                # Layout halaman
│   ├── pages/                  # Halaman seperti Home, Scan, Article, Login, Register, dll
│   ├── utils/                  # Fungsi-fungsi utilitas
│   ├── App.css                 # File styling global untuk komponen App
│   ├── App.jsx                 # Komponen utama aplikasi
│   └── index.css               # File CSS utama
│   ├── main.jsx                # Entry point React
│
├── index.html                 # Template HTML
├── eslint.config.js           # Konfigurasi ESLint untuk menjaga konsistensi kode
├── tailwind.config.js         # Konfigurasi Tailwind CSS
├── vite.config.js             # Konfigurasi Vite
├── package.json               # Informasi proyek dan dependensi
└── README.md                  # Dokumentasi Proyek
```

---

## 🧩 Teknologi yang Digunakan

- [React JS](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)