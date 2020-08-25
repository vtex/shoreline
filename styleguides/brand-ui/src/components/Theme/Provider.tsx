import React, { ReactNode } from 'react'
import { ThemeProvider as ThemeUIProvider } from 'theme-ui'

import { theme } from './theme'

export interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
}
