import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import nested from 'postcss-nested'
import postcss from 'postcss'
import { format } from 'prettier'

import { loadConfigFile } from './node/load-config'
import { genCssVariables, genTokens, genTypescriptCode } from './css-engine'
import { outputFile } from './node/output-file'

export async function theme() {
  const {
    config: { tokens = {}, outdir },
  } = loadConfigFile({
    cwd: process.cwd(),
  })

  const cssCode = genCssVariables(genTokens(tokens))

  const { css } = await postcss([autoprefixer, cssnano, nested]).process(
    cssCode
  )

  outputFile({
    path: `${outdir}/tokens.css`,
    code: Buffer.from(css),
    successMessage: '🎨 Tokens generated!',
  })

  const tsCode = await format(genTypescriptCode(tokens), {
    parser: 'typescript',
    semi: false,
    singleQuote: true,
  })

  outputFile({
    path: `${outdir}/types.d.ts`,
    code: Buffer.from(tsCode),
    successMessage: '🏆 Types generated!',
  })
}
