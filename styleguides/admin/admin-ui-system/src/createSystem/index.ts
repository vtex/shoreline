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

  const styleConsumers = getThemeConsumers({ theme, patternKey, styleKeys })
  const ThemeProvider = createThemeProvider(theme)
  const createElement = createElementFactory(styleKeys)

  return {
    ThemeProvider,
    createElement,
    ...styleConsumers,
  }
}
