import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: ['react'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  legacyOutput: true,
  banner: {
    js: "'use client'",
  },
})
