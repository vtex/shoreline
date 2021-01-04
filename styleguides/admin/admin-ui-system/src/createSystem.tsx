import React from 'react'
import { css } from '@emotion/css'

import { ThemeProvider as BaseProvider } from './core'
import { styles } from './styles'
import { StyleProp } from './types'
import { get } from './util'

export function createSystem<T>(theme: T): CreateSystemReturn {
  const ThemeProvider = createThemeProvider(theme)
  const { cn, stylesOf } = createThemeConsumers(theme)

  return {
    ThemeProvider,
    cn,
    stylesOf,
  }
}

export function createThemeProvider<T>(theme: T) {
  return function ThemeProvider({
    children,
  }: React.PropsWithChildren<unknown>) {
    return <BaseProvider theme={theme}>{children}</BaseProvider>
  }
}

export function createThemeConsumers<T>(theme: T) {
  return {
    stylesOf(themeKey: string) {
      const rawStyles = get(
        (theme as unknown) as Record<string, unknown>,
        themeKey,
        {}
      )

      return rawStyles as StyleProp
    },
    cn(styleProp: StyleProp) {
      const rawStyles = styles(styleProp)(theme)
      const className = css(rawStyles)

      return className
    },
  }
}

export type CreateSystemReturn = {
  ThemeProvider: ReturnType<typeof createThemeProvider>
} & ReturnType<typeof createThemeConsumers>
