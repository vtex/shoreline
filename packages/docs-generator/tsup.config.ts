import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/templates'],
  external: ['typedoc'],
  sourcemap: true,
  clean: true,
  loader: {
    '.hbs': 'copy',
  },
})
