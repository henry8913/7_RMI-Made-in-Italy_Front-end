import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carica le variabili d'ambiente in base all'ambiente (development, production, ecc.)
  const env = loadEnv(mode, process.cwd(), '');
  
  // Utilizza VITE_BACKEND_URL se disponibile, altrimenti usa il valore di default
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:2025';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        }
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      chunkSizeWarningLimit: 1600,
    },
  }
})
