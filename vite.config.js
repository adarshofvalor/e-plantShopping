import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/e-plantShopping/", // ✅ trailing slash is required
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})
