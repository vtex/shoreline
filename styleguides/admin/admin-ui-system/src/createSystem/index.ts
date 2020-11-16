import { createElementFactory } from './createElementFactory'
import { createThemeProvider } from './createThemeProvider'
import { createSystemProvider } from './createSystemProvider'
import { getThemeConsumers } from './getThemeConsumers'

export interface SystemParams<T> {
  theme: T
  patternKey?: string
  styleKeys?: string[]
}

export function createSystem<T>(params: SystemParams<T>) {
  const { theme, patternKey = 'patterns', styleKeys = [] } = params

  const ThemeProvider = createThemeProvider(theme)
  const styleConsumers = getThemeConsumers({ theme, patternKey, styleKeys })
  const createElement = createElementFactory(styleKeys)

  const system = {
    createElement,
    ...styleConsumers,
  }

  const systemProvider = createSystemProvider(system)

  return {
    ThemeProvider,
    ...system,
    ...systemProvider,
  }
}
