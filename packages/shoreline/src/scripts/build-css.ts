import { bundle } from '@vtex/shoreline-css'
import tokens from '../themes/sunrise/tokens'

export function build() {
  bundle({
    tokens,
    inputFile: 'src/themes/sunrise/styles.css',
    outdir: 'dist/themes/sunrise',
    useCascadeLayers: true,
  })

  bundle({
    tokens,
    inputFile: 'src/themes/sunrise/styles-unlayered.css',
    outdir: 'dist/themes/sunrise',
    useCascadeLayers: false,
  })
}

build()
