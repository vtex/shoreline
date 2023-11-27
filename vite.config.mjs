import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    hmr: {
      overlay: false,
    },
  },
  test: {
    globals: true,
    watch: false,
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: './vitest-setup.mjs',
    environment: 'happy-dom',
    css: false,
  },
})
