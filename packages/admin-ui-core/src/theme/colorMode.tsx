import type { ReactNode } from 'react'
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react'
import { isBrowser, get } from '@vtex/admin-ui-util'
import { useStoredState } from './useStoredState'

const useSafeEffect = isBrowser ? useLayoutEffect : useEffect

export interface ColorModeContextType {
  colorMode: string
  setColorMode: React.Dispatch<React.SetStateAction<string>>
}

export const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: 'default',
  setColorMode: () => null,
})

export function useColorMode() {
  return useContext(ColorModeContext)
}

export function attachCSSVariablesToDOM(props: Record<string, any>) {
  if (!isBrowser) return

  const root = document.documentElement

  Object.keys(props).map((prop) => {
    root.style.setProperty(prop, props[prop])
  })
}

interface ColorModeProviderProps {
  cssVariables: Record<string, Record<string, string>>
  defaultColorMode?: string
  children?: ReactNode
}

export function ColorModeProvider(props: ColorModeProviderProps) {
  const { cssVariables, defaultColorMode = 'default', children } = props
  const [colorMode, setColorMode] = useStoredState(
    defaultColorMode,
    'admin-ui-color-mode'
  )

  useSafeEffect(() => {
    if (!isBrowser) return
    attachCSSVariablesToDOM(get(cssVariables, colorMode))
  }, [cssVariables, colorMode])

  return (
    <ColorModeContext.Provider
      value={{
        colorMode,
        setColorMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  )
}
