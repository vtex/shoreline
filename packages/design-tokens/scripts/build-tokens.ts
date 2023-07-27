import { transform } from 'lightningcss'
import { tokens } from '../src/tokens'
import { transformTokens } from '../src/transform-tokens'
import { renderCssVariables } from '../src/render-css-variables'

import { outputFile } from './script-utils'

const cssCode = renderCssVariables(transformTokens(tokens))

const { code } = transform({
  filename: 'tokens.css',
  code: Buffer.from(cssCode),
  minify: false,
})

outputFile({
  path: 'dist/css/tokens.css',
  code,
  successMessage: '🎨 Tokens generated!',
})
