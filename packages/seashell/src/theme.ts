import { genTokensCssCode, genTypescriptCode } from './css-engine'
import { loadConfig } from './config'
import { outputFile } from './output-file'

export async function theme() {
  const {
    config: { tokens = {}, outdir },
  } = loadConfig({
    cwd: process.cwd(),
  })

  const css = await genTokensCssCode(tokens)

  outputFile({
    path: `${outdir}/tokens.css`,
    code: Buffer.from(css),
    successMessage: '🎨 Tokens generated!',
  })

  const ts = await genTypescriptCode(tokens)

  outputFile({
    path: `${outdir}/types.d.ts`,
    code: ts,
    successMessage: '🏆 Types generated!',
  })
}
