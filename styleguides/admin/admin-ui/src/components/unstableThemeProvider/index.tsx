import React, { ReactNode } from 'react'
import { Theme, SxStyleProp } from '@theme-ui/core'
import { createSystem } from '@vtex/admin-ui-system'
import { unstableTheme, Preflight } from '@vtex/admin-ui-theme'

interface UnstableThemeProviderProps {
  children?: ReactNode
  theme?: Theme
  components?: Record<string, SxStyleProp>
}

const { ThemeProvider, cn, createElement } = createSystem({
  theme: unstableTheme,
})

function Provider(props: UnstableThemeProviderProps) {
  const { children } = props

  // This allow custom themes
  // const theme = useMemo(
  //   () => merge((unstableTheme as unknown) as Theme, custonTheme),
  //   [custonTheme]
  // )

  return (
    <ThemeProvider>
      <Preflight />
      {children}
    </ThemeProvider>
  )
}

export { Provider as unstableThemeProvider, cn, createElement }
