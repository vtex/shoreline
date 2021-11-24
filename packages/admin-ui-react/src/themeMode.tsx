import type { ReactNode } from 'react'
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react'
import { isBrowser } from '@vtex/admin-ui-util'
import { useStoredState } from './hooks/useStoredState'
import { Global } from '@emotion/react'

const useSafeEffect = isBrowser ? useLayoutEffect : useEffect

export interface ThemeModeContextType {
  themeMode: string
  setThemeMode: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
  themeMode: 'main',
  setThemeMode: () => null,
})

export function useThemeMode() {
  return useContext(ThemeModeContext)
}

export function attachCSSVariablesToDOM(props: Record<string, any>) {
  if (!isBrowser) return

  const root = document.documentElement

  Object.keys(props).map((prop) => {
    root.style.setProperty(prop, props[prop])
  })
}

export interface ThemeModeProviderProps {
  styleObject: Record<string, any>
  defaultThemeMode?: string
  children?: ReactNode
}

export function ThemeModeProvider(props: ThemeModeProviderProps) {
  const { styleObject = {}, defaultThemeMode = 'main', children } = props
  const [themeMode, setThemeMode] = useStoredState(
    defaultThemeMode,
    'admin-ui-theme-mode'
  )

  useSafeEffect(() => {
    if (!isBrowser) return
    document.body.dataset.theme = themeMode
  }, [themeMode])

  return (
    <ThemeModeContext.Provider
      value={{
        themeMode,
        setThemeMode,
      }}
    >
      <Global styles={styleObject} />
      {children}
    </ThemeModeContext.Provider>
  )
}
