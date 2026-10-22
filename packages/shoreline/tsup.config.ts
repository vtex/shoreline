import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: ['react'],
  splitting: false,
  sourcemap: true,
  // `prebuild` owns the `dist` cleanup. tsup runs concurrently with the CSS
  // build, so cleaning here could delete theme files emitted in the meantime.
  clean: false,
  dts: true,
  banner: {
    js: "'use client'",
  },
})
