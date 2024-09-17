import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import vercel from 'vite-plugin-vercel'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vercel()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      components: `${path.resolve(__dirname, './src/components/')}`,
      public: `${path.resolve(__dirname, './public/')}`,
      pages: path.resolve(__dirname, './src/pages'),
      types: `${path.resolve(__dirname, './src/@types')}`
    }
  }
})
