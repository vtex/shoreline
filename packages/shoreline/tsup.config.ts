import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: ['react'],
  splitting: false,
  sourcemap: true,
  // prebuild owns cleanup; tsup must preserve the concurrent CSS build outputs.
  clean: false,
  dts: true,
  banner: {
    js: "'use client'",
  },
})
