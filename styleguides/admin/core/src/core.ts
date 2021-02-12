import { createContext, ReactNode, useContext } from 'react'
import { CacheProvider } from '@vtex/admin-ui-system'
import { createSystem, jsxs, defaultSystem } from './system'
import { GlobalStyles } from './global'
import invariant from 'tiny-invariant'

const SystemContext = createContext<ReturnType<typeof createSystem> | null>(
  null
)

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, system = defaultSystem } = props

  return jsxs(
    CacheProvider,
    { value: system.emotionInstance.cache },
    jsxs(
      SystemContext.Provider,
      { value: system },
      ...[jsxs(GlobalStyles, {}), jsxs(system.ThemeProvider, {}, children)]
    )
  )
}

export function useSystem() {
  const context = useContext(SystemContext)

  invariant(
    context,
    `Do not use admin core functionalities outside of Admin context`
  )

  const { cn, stylesOf, emotionInstance } = context

  return {
    cn,
    stylesOf,
    keyframes: emotionInstance.keyframes,
    cx: emotionInstance.cx,
  }
}

export interface ThemeProviderProps {
  children?: ReactNode
  system?: ReturnType<typeof createSystem>
}
