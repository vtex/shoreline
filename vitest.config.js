import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    watch: false,
    include: ['**/*.vitest.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: './vitest-setup.js',
    environment: 'happy-dom',
    css: false, // disabled since our tests don't rely on CSS.
  },
})
