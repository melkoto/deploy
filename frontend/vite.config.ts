import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Это позволяет доступ к Vite-серверу с других устройств
    port: 5173, // Убедитесь, что порт совпадает
  }
})
