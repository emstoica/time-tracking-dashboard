import { defineConfig } from 'vite'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react(), svgr()],
  build: {
    outDir: 'dist',
    assetsDir: 'src',
    minify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  sourcemap: true,
})
