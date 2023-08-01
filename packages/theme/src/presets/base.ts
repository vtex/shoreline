import { defineConfig } from '../config'

export const presetBase = defineConfig({
  prefix: 'sl',
  outdir: './shoreline',
  cwd: process.cwd(),
  tokens: {},
})
