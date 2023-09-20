import type { ShorelineConfig } from '@vtex/shoreline-utils'
import { merge } from '@vtex/shoreline-utils'

export function extendConfig(config: ShorelineConfig) {
  const { preset, ...rest } = config

  return merge(preset, rest)
}
