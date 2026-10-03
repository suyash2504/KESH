import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves the project from /KESH/ (suyash2504.github.io/KESH/).
  base: '/KESH/',
  plugins: [react(), tailwindcss()],
  server: { port: 5196, strictPort: true },
})
