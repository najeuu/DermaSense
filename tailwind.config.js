/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#32C2A0',      // untuk judul & tombol utama
        secondary: '#757575',     // untuk teks biasa
        textPink: '#F4426F',      // untuk link Sign Up / highlight
        solutionBox: '#1E7460',   // area solution
        textDark: '#333333',      // teks gelap (opsional)
        textGreen: '#1E7460',     // teks hijau
        textGrayDark: '#4B4B4B',  // teks abu tua
        textGrayLight: '#B3B3B3', // teks abu muda
        buttonAlt: '#F1FFF9',     // tombol alternatif
        pageBg: '#FFFFFF',        // warna halaman
      },
    },
  },
  plugins: [],
}
