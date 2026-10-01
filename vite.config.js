import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    watch: {
      // Файлы, которые правит Claude через удалённый мост, не всегда
      // триггерят нативные fsevents macOS — поэтому watcher переходит
      // на polling и гарантированно ловит любые внешние изменения.
      usePolling: true,
      interval: 300,
    },
  },
})
