import { bundle } from '@vtex/shoreline-css'
import { watch } from 'chokidar'

function build() {
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

function main() {
  console.log('Watching CSS files')

  build()

  watch('**/*.css', {
    ignored: [
      'dist/themes/sunrise/styles.css',
      'dist/themes/sunrise/styles-unlayered.css',
    ],
    ignoreInitial: false,
  }).on('change', (path) => {
    build()

    console.log(`File ${path} has been changed`)
  })
}

main()
