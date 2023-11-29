import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  external: ['vitest'],
  sourcemap: true,
  clean: true,
  dts: true,
})
