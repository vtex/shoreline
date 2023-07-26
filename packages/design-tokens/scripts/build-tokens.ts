import { transform } from 'lightningcss'
import { cssCode } from '../src/css-code'
import fse from 'fs-extra'

const outDir = 'dist'
const filename = 'tokens.css'
const outputPath = `${outDir}/css/${filename}`

const { code } = transform({
  filename,
  code: Buffer.from(cssCode),
  minify: false,
})

fse.outputFile(outputPath, code, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`🎨 Tokens generated!`)
  }
})
