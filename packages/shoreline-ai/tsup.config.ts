import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  external: [
    'react',
    'react-dom',
    '@vtex/shoreline',
    '@vtex/shoreline-css',
    '@vtex/shoreline-utils',
    '@ariakit/react',
    '@assistant-ui/react',
    'react-markdown',
    'rehype-sanitize',
    'remark-gfm',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  banner: {
    js: "'use client'",
  },
})
