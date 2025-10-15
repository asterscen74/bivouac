import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['reserve-bivouac74.fr'],
    port: 3010,
  },
  define: {
    'process.env': {}
  },
})
