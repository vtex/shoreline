import React from 'react'
import { theme, cssVariables, styles, globalCss } from '@vtex/admin-ui-core'
import { Helmet } from 'react-helmet'
import type { ReactNode } from 'react'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

import { IconProvider } from '../icons'

export interface ThemeProviderProps {
  children?: ReactNode
  experimentalTheme?: any
  experimentalDisabledGlobalStyles?: boolean
}

export function ThemeProvider(props: ThemeProviderProps) {
  const {
    children,
    experimentalTheme,
    experimentalDisabledGlobalStyles = false,
  } = props

  const global = experimentalDisabledGlobalStyles
    ? {}
    : styles(experimentalTheme?.global ?? theme.global)

  globalCss({ ':root': cssVariables, ...global } as any)()

  return (
    <IconProvider>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {children}
    </IconProvider>
  )
}
