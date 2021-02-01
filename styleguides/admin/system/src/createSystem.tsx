import React from 'react'

import createEmotion, { Emotion } from '@emotion/css/create-instance'

import { ThemeProvider as BaseProvider } from './core'
import { styles, StyleProp, get } from '@vtex/admin-styles'

export function createSystem<T>(theme: T, appKey: string): CreateSystemReturn {
  const emotionInstance = createEmotionInstance(appKey)
  const ThemeProvider = createThemeProvider(theme)
  const { cn, stylesOf } = createThemeConsumers(theme, emotionInstance)

  return {
    emotionInstance,
    ThemeProvider,
    cn,
    stylesOf,
  }
}

export function createEmotionInstance(appKey: string) {
  return createEmotion({
    key: appKey,
  })
}

export function createThemeProvider<T>(theme: T) {
  return function AdminProvider({
    children,
  }: React.PropsWithChildren<unknown>) {
    return <BaseProvider theme={theme}>{children}</BaseProvider>
  }
}

export function createThemeConsumers<T>(theme: T, emotionInstance: Emotion) {
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
      const className = emotionInstance.css(rawStyles)

      return className
    },
  }
}

export type CreateSystemReturn = {
  ThemeProvider: ReturnType<typeof createThemeProvider>
} & ReturnType<typeof createThemeConsumers> & {
    emotionInstance: ReturnType<typeof createEmotionInstance>
  }
