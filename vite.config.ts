import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  test: {
    globals: false,
    watch: false,
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./packages/test-utils/dist/setup.mjs'],
    environment: 'jsdom',
    css: false,
  },
})
