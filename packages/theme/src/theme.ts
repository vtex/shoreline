import { genStyles } from './gen-styles'
import { loadConfig } from './config'
import { outputFile } from './output-file'
import { genTypescript } from './gen-typescript'
import { extendConfig } from './extend-config'
import { genTokensObject } from './gen-tokens-object'

export async function theme() {
  const config = loadConfig({
    cwd: process.cwd(),
  })

  const extendedConfig = extendConfig(config)

  const css = await genStyles(extendedConfig)

  outputFile({
    path: `${extendedConfig.outdir}/styles.css`,
    code: css,
    successMessage: '🎨 Style generated!',
  })

  const ts = await genTypescript(extendedConfig)

  outputFile({
    path: `${extendedConfig.outdir}/types.d.ts`,
    code: ts,
    successMessage: '🏆 Types generated!',
  })

  const tokens = await genTokensObject(extendedConfig)

  outputFile({
    path: `${extendedConfig.outdir}/tokens.ts`,
    code: tokens,
    successMessage: '🍰 Tokens generated!',
  })
}
