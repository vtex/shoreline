import jitiFactory from 'jiti'
import { transform } from 'sucrase'

let jiti: Jiti = null

/**
 * Inits jiti lazily.
 * We use jiti here as a sandbox for running code.
 * This allow us to avoid the `eval` function.
 */
export function lazyJiti() {
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

type Jiti = ReturnType<typeof jitiFactory> | null
