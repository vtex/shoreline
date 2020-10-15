import React, { ReactNode } from 'react'
import { ThemeProvider as ThemeUIProvider } from '@theme-ui/core'
import 'focus-visible/dist/focus-visible'

interface Props {
  children: ReactNode
  theme?: any
}

export function ThemeProviderNext({ children, theme }: Props) {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
}
