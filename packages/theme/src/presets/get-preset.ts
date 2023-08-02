import type { ShorelineConfig } from '../config'
import { presetAdmin } from './admin'
import { presetBase } from './base'

const presetMap: Record<Presets, ShorelineConfig> = {
  admin: presetAdmin,
  base: presetBase,
}

export function getPreset(preset?: Presets): ShorelineConfig {
  if (!preset) return {}

  return presetMap[preset]
}

export type Presets = 'admin' | 'base'
