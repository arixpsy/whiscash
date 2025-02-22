import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'whiscash.png'],
      manifest: {
        name: 'Whiscash',
        short_name: 'Whiscash',
        description: 'Expense Tracker',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'logo-x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'logo-x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('src/'),
    },
  },
})
