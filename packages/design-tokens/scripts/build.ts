import { bundle } from 'lightningcss'
import fse from 'fs-extra'

const outDir = 'dist'
const filename = 'src/css/style.css'
const outputPath = `${outDir}/css/style.css`

const { code } = bundle({
  filename,
  minify: false,
})

fse.outputFile(outputPath, code, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`🤖 Build done!`)
  }
})
