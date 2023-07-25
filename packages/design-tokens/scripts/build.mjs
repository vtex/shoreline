import { bundle } from 'lightningcss'
import fs from 'fs'

const { code } = bundle({
  filename: 'src/style.css',
  minify: true,
})

fs.writeFileSync('shoreline-tokens.css', code)
