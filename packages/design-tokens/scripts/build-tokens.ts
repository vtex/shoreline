import { transform } from 'lightningcss'
import { cssCode } from '../src/css-code'
import { outputFile } from './script-utils'

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
