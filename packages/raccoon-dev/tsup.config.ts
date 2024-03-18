import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['bin/index.ts'],
  format: ['esm'],
  external: ['node'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  legacyOutput: true,
})
