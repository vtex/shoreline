import { bundle } from '@vtex/shoreline-css'

function main() {
  bundle({
    inputFile: 'src/themes/sunrise/styles.css',
    outputFile: 'dist/themes/sunrise/styles.css',
    banner: '@layer sl-reset, sl-base, sl-tokens, sl-components;',
    browserslistQuery: 'last 1 versions',
  })

  bundle({
    inputFile: 'src/themes/sunrise/styles-unlayered.css',
    outputFile: 'dist/themes/sunrise/styles-unlayered.css',
    browserslistQuery: 'last 1 versions',
  })
}

main()
