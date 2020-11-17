import { createElementFactory } from './createElementFactory'
import { createThemeProvider } from './createThemeProvider'
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

  return {
    ThemeProvider,
    ...system,
  }
}
