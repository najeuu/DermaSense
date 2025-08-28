import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://9df51053-3359-439c-8b58-1024d68f9aaa-00-5c1cj7iuirec.pike.replit.dev',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})