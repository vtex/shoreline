import { subscribe } from '@parcel/watcher'
import { build } from './build-css'
import path from 'node:path'

console.log('👀 Watching CSS files')

/**
 * We must trigger the first build to avoid errors
 */
build()

const themesPath = path.join(__dirname, '../themes/')

subscribe(themesPath, (err, events) => {
  if (err) {
    console.error(err)
  }

  const shouldTriggerBuild = events.some(
    ({ type }) => type === 'update' || type === 'create' || type === 'delete'
  )

  if (shouldTriggerBuild) {
    build()
  }
})
