import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'package', // 'build'
    lib: {
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      fileName: 'twitch-polls',
      formats: ['es']
    },
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3001
    }
  }
})
