import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: [
    'react',
    'react-dom',
    '@assistant-ui/react',
    '@vtex/shoreline',
    '@vtex/shoreline-utils',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  banner: {
    js: "'use client'",
  },
})
