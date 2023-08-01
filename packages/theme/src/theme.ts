import { genStyle } from './gen-style'
import { loadConfig } from './config'
import { outputFile } from './output-file'
import { genTypescript } from './gen-typescript'
import { extendConfig } from './extend-config'

export async function theme() {
  const { config } = loadConfig({
    cwd: process.cwd(),
  })

  const extendedConfig = extendConfig(config)

  const css = await genStyle(extendedConfig)

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
}
