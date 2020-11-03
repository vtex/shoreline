import React, { PropsWithChildren } from 'react'
import { ThemeProvider as BaseProvider } from '@theme-ui/core'

export function createThemeProvider<T>(theme: T) {
  return function ThemeProvider({ children }: PropsWithChildren<{}>) {
    return <BaseProvider theme={theme}>{children}</BaseProvider>
  }
}
