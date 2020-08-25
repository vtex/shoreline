import React, { ReactNode } from 'react'
import { ThemeProvider as ThemeUIProvider } from 'theme-ui'

import { theme } from './theme'

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  return <ThemeUIProvider theme={theme}>{children}</ThemeUIProvider>
}
