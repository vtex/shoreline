import { createContext, ReactNode, useContext } from 'react'
import { CacheProvider } from '@vtex/admin-ui-system'
import invariant from 'tiny-invariant'
/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

import { createSystem, jsxs, defaultSystem } from './system'
import { Styles, Imports } from './global'

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
      ...[
        jsxs(Imports, {}),
        jsxs(Styles, {}),
        jsxs(system.ThemeProvider, {}, children),
      ]
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
