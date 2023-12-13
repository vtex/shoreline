import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/templates'],
  format: ['esm'],
  external: ['typedoc', 'prettier'],
  sourcemap: true,
  clean: true,
  loader: {
    '.hbs': 'copy',
  },
  legacyOutput: true,
})
