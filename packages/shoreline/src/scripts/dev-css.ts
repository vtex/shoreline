import { watch } from 'chokidar'
import { build } from './build-css'

function main() {
  console.log('Watching CSS files')

  build()

  watch('**/*.css', {
    ignored: ['dist/**'],
    ignoreInitial: false,
  }).on('change', (path) => {
    build()

    console.log(`File ${path} has been changed`)
  })
}

main()
