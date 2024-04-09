import { merge, constants } from '@vtex/shoreline-utils'
import type { ShorelineConfig } from './types'

/**
 * Extends the Shoreline config by merging the preset with aditional properties.
 */
export function extendConfig(config: ShorelineConfig) {
  const { preset, ...rest } = config

  return merge(preset, rest)
}

/**
 * Define a Shoreline configuration
 */
export function defineConfig(
  config: Omit<ShorelineConfig, 'prefix'> = {}
): ShorelineConfig {
  return { prefix: constants.dsPrefix, ...config }
}
