import React from 'react'
import type { Emotion } from '@emotion/css/create-instance'
import createEmotion from '@emotion/css/create-instance'
import type { StyleProp, Theme } from '@vtex/admin-styles'
import { styles, get } from '@vtex/admin-styles'

import { ThemeProvider as BaseProvider } from './core'

export function createSystem<T extends Theme>(
  theme: T,
  appKey: string
): CreateSystemReturn {
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

export function createThemeProvider<T extends Theme>(theme: T) {
  return function AdminProvider({
    children,
  }: React.PropsWithChildren<unknown>) {
    return <BaseProvider theme={theme}>{children}</BaseProvider>
  }
}

export function createThemeConsumers<T extends Theme>(
  theme: T,
  emotionInstance: Emotion
) {
  return {
    stylesOf(themeKey: string) {
      const rawStyles = get(
        theme as unknown as Record<string, unknown>,
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
