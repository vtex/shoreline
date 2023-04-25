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
        <link
          rel="preload"
          href="https://davicosta.com/VTEXTrust-VF-Apr-25-2023.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Helmet>
      {children}
    </IconProvider>
  )
}
