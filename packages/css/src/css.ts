import { loadConfig } from 'c12'
import type { ShorelineConfig } from '@vtex/shoreline-utils'
import fse from 'fs-extra'

import { extendConfig } from './config'
import { TokenCollecton } from './token-collection'

export async function css() {
  const loadedConfig = await loadConfig({
    name: 'shoreline',
    cwd: process.cwd(),
  })

  const config: ShorelineConfig = loadedConfig?.config ?? {}
  const extendedConfig = extendConfig(config)

  const collection = new TokenCollecton(extendedConfig?.tokens ?? {})

  const css = await collection.getCssCode()
  const tokens = await collection.getTsCode()

  outputFile({
    path: `${extendedConfig.outdir}/styles.css`,
    code: Buffer.from(css),
    successMessage: '🎨 Style generated!',
  })

  outputFile({
    path: `${extendedConfig.outdir}/tokens.ts`,
    code: Buffer.from(tokens),
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
