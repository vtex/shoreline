import {
  runtime as emotionRuntime,
  StyleProp,
} from '@vtex/onda-runtime-emotion'
import { Ocean, buildRuntime, buildSteps } from '@vtex/onda-system'
import { plugins as defaultPlugins } from '@vtex/onda-plugins'

interface System {
  cn: (styleProp: StyleProp) => string
  // emotion: Emotion
}

interface SystemSpec<Theme extends Record<string, any>> {
  id: string
  theme: Theme
  ocean: Ocean<Theme>
}

export function createSystem<Theme extends Record<string, any>>(
  spec: SystemSpec<Theme>
): System {
  const {
    id,
    theme,
    ocean: { plugins = defaultPlugins },
  } = spec

  const steps = buildSteps(theme, plugins)
  const { exec: cn } = buildRuntime({ id }, steps, emotionRuntime)

  return {
    cn,
  }
}
