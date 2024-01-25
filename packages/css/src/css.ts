import { loadConfig } from 'c12'
import type { ShorelineConfig } from '@vtex/shoreline-utils'

import { genStyles } from './gen-styles'
import { outputFile } from './output-file'
import { extendConfig } from './extend-config'
import { genTokensObject } from './gen-tokens-object'

export async function css() {
  const loadedConfig = await loadConfig({
    name: 'shoreline',
    cwd: process.cwd(),
  })

  const config: ShorelineConfig = loadedConfig?.config ?? {}
  const extendedConfig = extendConfig(config)
  const css = await genStyles(extendedConfig)
  const tokens = await genTokensObject(extendedConfig)

  outputFile({
    path: `${extendedConfig.outdir}/styles.css`,
    code: css,
    successMessage: '🎨 Style generated!',
  })

  outputFile({
    path: `${extendedConfig.outdir}/tokens.ts`,
    code: tokens,
    successMessage: '🍰 Tokens generated!',
  })
}
