import type { ShorelineConfig } from '@vtex/shoreline-utils'
import { constants } from '@vtex/shoreline-utils'

type DefineConfigParams = Omit<ShorelineConfig, 'prefix'>

/**
 * Define a Shoreline configuration
 */
export function defineConfig(config: DefineConfigParams = {}): ShorelineConfig {
  return { prefix: constants.dsPrefix, ...config }
}
