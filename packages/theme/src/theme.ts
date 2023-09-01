import { genStyles } from './gen-styles'
import { loadConfig } from './config'
import { outputFile } from './output-file'
import { genTypescript } from './gen-typescript'
import { extendConfig } from './extend-config'
import { genTypescriptTheme } from './gen-typescript-theme'

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
}

export async function tsTheme() {
  const config = loadConfig({
    cwd: process.cwd(),
  })

  const extendedConfig = extendConfig(config)

  const tsTheme = await genTypescriptTheme(extendedConfig)

  outputFile({
    path: `${extendedConfig.outdir}/theme.ts`,
    code: tsTheme,
    successMessage: '🎨 Typescript theme generated!',
  })
}
