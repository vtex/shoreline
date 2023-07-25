import { transform } from 'lightningcss'
import { cssCode } from '../src/css-code.ts'
import fs from 'fs'

const { code } = transform({
  code: Buffer.from(cssCode),
  minify: false,
})

fs.writeFileSync('tokens.css', code)
