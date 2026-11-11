import { bundle } from '@vtex/shoreline-css'

export function build() {
  const outdir = 'dist'
  const inputFile = 'src/styles.css'

  bundle({
    inputFile,
    outdir,
    outputFile: 'styles',
    layer: 'sl-components',
  })

  bundle({
    inputFile,
    outdir,
    outputFile: 'styles',
  })
}

build()
