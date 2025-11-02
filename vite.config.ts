import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'particles-vendor': ['react-tsparticles', 'tsparticles-slim', 'tsparticles-engine'],
          'carousel-vendor': ['react-slick', 'slick-carousel'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1000 kB to reduce warnings
  },
})
