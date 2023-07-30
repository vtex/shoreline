import jitiFactory from 'jiti'
import { transform } from 'sucrase'

import type { ShorelineConfig } from '../types'

let jiti: ReturnType<typeof jitiFactory> | null = null

function lazyJiti() {
  return (
    jiti ??
    (jiti = jitiFactory(__filename, {
      interopDefault: true,
      transform: (opts) => {
        return transform(opts.source, {
          transforms: ['typescript', 'imports'],
        })
      },
    }))
  )
}

export function load(path: string): { config: ShorelineConfig } {
  const config = (function () {
    try {
      // eslint-disable-next-line node/global-require, @typescript-eslint/no-require-imports
      return path ? require(path) : {}
    } catch {
      return lazyJiti()(path)
    }
  })()

  return { config: config.default ?? config }
}
