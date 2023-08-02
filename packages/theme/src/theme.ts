import { genStyle } from './gen-style'
import { loadConfig } from './config'
import { outputFile } from './output-file'
import { genTypescript } from './gen-typescript'

export async function theme() {
  const { config } = loadConfig({
    cwd: process.cwd(),
  })

  const css = await genStyle(config)

  outputFile({
    path: `${config.outdir}/style.css`,
    code: css,
    successMessage: '🎨 Style generated!',
  })

  const ts = await genTypescript(config)

  outputFile({
    path: `${config.outdir}/types.d.ts`,
    code: ts,
    successMessage: '🏆 Types generated!',
  })
}
