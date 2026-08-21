import { defineConfig, type UserConfig } from 'vite'
import type { ViteReactSSGOptions } from 'vite-react-ssg'
import react from '@vitejs/plugin-react'
import path from 'path'

// vite-react-ssg lee ssgOptions del config de Vite, pero no extiende el tipo
// UserConfig, así que hay que declararlo acá.
interface ConfigWithSSG extends UserConfig {
  ssgOptions?: ViteReactSSGOptions
}

const config: ConfigWithSSG = {
  plugins: [react()],
  // dirStyle 'flat' emite dist/venta.html. Con "cleanUrls" en vercel.json,
  // Vercel lo sirve en /venta, y el 404.html queda en la raíz del output,
  // que es donde Vercel lo busca para responder un 404 real.
  ssgOptions: {
    dirStyle: 'flat',
    formatting: 'none',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}

export default defineConfig(config)
