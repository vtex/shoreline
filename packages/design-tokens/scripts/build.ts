import { bundle } from 'lightningcss'
import { outputFile } from './script-utils'

const { code } = bundle({
  filename: 'src/css/style.css',
  minify: false,
})

outputFile({
  path: 'dist/css/style.css',
  code,
  successMessage: '🔥 Build done!',
})
