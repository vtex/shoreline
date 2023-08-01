import { merge } from '@vtex/shoreline-utils'

import { getPreset } from './presets'
import type { ShorelineConfig } from './config'

export function extendConfig(config: ShorelineConfig) {
  const { preset, ...rest } = config

  const extendedConfig = getPreset(preset)

  return merge(extendedConfig, rest)
}
