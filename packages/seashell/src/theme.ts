import { genTokensCssCode, genTypescriptCode } from './css-engine'
import { loadConfigFile } from './node/load-config'
import { outputFile } from './node/output-file'

export async function theme() {
  const {
    config: { tokens = {}, outdir },
  } = loadConfigFile({
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
