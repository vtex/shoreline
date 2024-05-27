import { theme } from '@vtex/shoreline-css'
function main() {
  theme({
    inputFile: 'src/themes/sunrise/tokens.css',
    outputFile: 'dist/themes/sunrise/tokens.css',
  })

  theme({
    inputFile: 'src/themes/sunrise/tokens.css',
    outputFile: 'dist/themes/sunrise/tokens-unlayered.css',
    useCascadeLayers: false,
  })
}

main()
