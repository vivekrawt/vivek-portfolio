import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The live site is served from https://vivekrawt.github.io/vivek-portfolio/.
// Local development runs at the domain root; `build:root` can still override
// the production base for Vercel or a custom apex domain.
const base = process.env.NODE_ENV === 'development' ? '/' : '/vivek-portfolio/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
