import { subscribe } from '@parcel/watcher'
import { build } from './build-css'
import path from 'node:path'

console.log('👀 Watching CSS files')

/**
 * We must trigger the first build to avoid errors
 */
build()

// Both theme entrypoints and their shared inputs can change the emitted CSS.
for (const source of ['themes', 'foundations']) {
  subscribe(path.join(__dirname, '..', source), (err, events) => {
    if (err) {
      console.error(err)
      return
    }

    const shouldTriggerBuild = events.some(
      ({ type, path: file }) =>
        file.endsWith('.css') &&
        (type === 'update' || type === 'create' || type === 'delete')
    )

    if (shouldTriggerBuild) {
      build()
    }
  })
}
