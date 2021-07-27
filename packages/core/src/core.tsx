import React from 'react'
import { createContext, ReactNode, useContext } from 'react'
import { CacheProvider } from '@vtex/admin-ui-system'
import invariant from 'tiny-invariant'
/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

import { createSystem, defaultSystem } from './system'
import { Styles, Imports, FontsPreload } from './global'

const SystemContext = createContext<ReturnType<typeof createSystem> | null>(
  null
)

export function ThemeProvider(props: ThemeProviderProps) {
  const { children, system = defaultSystem } = props

  return (
    <CacheProvider value={system.emotionInstance.cache}>
      <SystemContext.Provider value={system}>
        <FontsPreload />
        <Imports />
        <Styles />
        <system.ThemeProvider>{children}</system.ThemeProvider>
      </SystemContext.Provider>
    </CacheProvider>
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
