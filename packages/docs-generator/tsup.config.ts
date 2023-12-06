import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  external: ['typedoc'],
  sourcemap: true,
  clean: true,
})
