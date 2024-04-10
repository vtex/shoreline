import { loadConfig } from 'c12'
import fse from 'fs-extra'

import { extendConfig } from './config'
import type { ShorelineConfig } from './types'
import { TokenCollection } from './token-collection'

export async function css() {
  const loadedConfig = await loadConfig({
    name: 'shoreline',
    cwd: process.cwd(),
  })

  const config: ShorelineConfig = loadedConfig?.config ?? {}
  const extendedConfig = extendConfig(config)

  const collection = new TokenCollection(extendedConfig?.tokens ?? {})

  const css = await collection.getCss()
  const cssUnlayered = await collection.getCss(false, false)
  const ts = await collection.getTs()

  outputFile({
    path: `${extendedConfig.outdir}/tokens.css`,
    code: Buffer.from(css),
    successMessage: '🎨 CSS tokens generated!',
  })

  outputFile({
    path: `${extendedConfig.outdir}/tokens-unlayered.css`,
    code: Buffer.from(cssUnlayered),
    successMessage: '🎨 Unlayered CSS tokens generated!',
  })

  outputFile({
    path: `${extendedConfig.outdir}/tokens.ts`,
    code: Buffer.from(ts),
    successMessage: '🍰 Tokens generated!',
  })
}

function outputFile(props: OutputFileProps) {
  const { path, code, successMessage } = props

  fse.outputFile(path, code, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log(successMessage)
    }
  })
}

interface OutputFileProps {
  path: string
  code: Buffer
  successMessage: string
}
