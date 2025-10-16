import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 700,
    allowedHosts: [
      'nobot.coinsspor.com',
      'localhost',
      '149.50.116.116'
    ]
  }
})
