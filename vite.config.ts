import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
})
