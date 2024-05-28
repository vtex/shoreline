import { bundle } from '@vtex/shoreline-css'

export function build() {
  bundle({
    inputFile: 'src/themes/sunrise/styles.css',
    tokensFile: 'src/themes/sunrise/tokens.css',
    outdir: 'dist/themes/sunrise',
    useCascadeLayers: true,
  })

  bundle({
    inputFile: 'src/themes/sunrise/styles-unlayered.css',
    tokensFile: 'src/themes/sunrise/tokens.css',
    outdir: 'dist/themes/sunrise',
    useCascadeLayers: false,
  })
}

build()
