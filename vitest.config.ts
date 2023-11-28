import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: false,
    watch: false,
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['vitest.setup.ts'],
    environment: 'jsdom',
    css: false,
  },
})
