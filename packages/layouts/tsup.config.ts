import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: ['react', 'next', '@vtex/shoreline-components'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  legacyOutput: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})
