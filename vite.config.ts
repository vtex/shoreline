import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  test: {
    globals: false,
    watch: false,
    include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],
    setupFiles: ['./packages/test-utils/dist/setup.mjs'],
    environment: 'jsdom',
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov'],
      all: true,
      thresholds: { lines: 67 },
      include: ['packages/shoreline-ai/src/**/*.{ts,tsx}'],
      exclude: [
        '**/tests/**',
        '**/*.test.{ts,tsx}',
        '**/*.stories.tsx',
        '**/stories/**',
        '**/test-utils/**',
        '**/index.ts',
        '**/types.ts',
        '**/types/**',
        '**/messages/en-US.ts',
        '**/messages/pt-BR.ts',
      ],
    },
  },
})
