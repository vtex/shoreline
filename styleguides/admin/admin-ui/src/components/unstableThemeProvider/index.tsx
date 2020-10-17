import React, { ReactNode, useMemo } from 'react'
import { merge, Theme, SxStyleProp } from '@theme-ui/core'

import { unstableThemeProvider as ThemeProvider } from '../../unstableSystem'
import { unstableTheme } from '../../unstableTheme'

interface UnstableThemeProviderProps {
  children?: ReactNode
  theme?: Theme
  components?: Record<string, SxStyleProp>
}

function Provider(props: UnstableThemeProviderProps) {
  const { children, theme: custonTheme = {} } = props

  // This allow custom themes
  const theme = useMemo(
    () => merge((unstableTheme as unknown) as Theme, custonTheme),
    [custonTheme]
  )

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export { Provider as unstableThemeProvider }
