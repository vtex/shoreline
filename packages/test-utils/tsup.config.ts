import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/setup.ts'],
  format: ['esm'],
  external: ['vitest'],
  sourcemap: true,
  clean: true,
  dts: true,
})
