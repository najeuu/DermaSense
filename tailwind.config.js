/** @type {import('tailwindcss').Config} */
export default {
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
      },
      colors: {
        primary: '#32C2A0',      // judul & tombol utama
        loginBox: '#D6FFED',     // kotak login & register
        solutionBox: '#1E7460',  // area solution
        textPink: '#F4426F',     // tulisan warna pink
        textDark: '#333333',     // tulisan gelap
        textGreen: '#1E7460',    // tulisan hijau
        textGrayDark: '#4B4B4B', // abu tua
        textGrayLight: '#B3B3B3',// abu muda
        buttonAlt: '#F1FFF9',    // kotak tombol lain
        pageBg: '#FFFFFF',       // warna halaman putih
      }
    }
  },
  plugins: [],
}
