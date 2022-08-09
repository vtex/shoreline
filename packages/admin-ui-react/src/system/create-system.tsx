import React from 'react'
import {
  createCsx,
  theme,
  cssVariables,
  styles,
  globalCss,
  cx,
} from '@vtex/admin-ui-core'
import type { ReactNode } from 'react'
import { Helmet } from 'react-helmet'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

import { IconProvider } from './icons'
import { SystemContext } from './context'

interface ThemeProviderProps {
  children?: ReactNode
  experimentalTheme?: any
  experimentalDisabledGlobalStyles?: boolean
}

export const csx = createCsx(theme)

export function ThemeProvider(props: ThemeProviderProps) {
  const {
    children,
    experimentalTheme,
    experimentalDisabledGlobalStyles = false,
  } = props

  const experimentalCsx = experimentalTheme ? createCsx(experimentalTheme) : csx

  const global = experimentalDisabledGlobalStyles
    ? {}
    : styles(experimentalTheme?.global ?? {})

  globalCss({ ':root': cssVariables, ...global } as any)()

  return (
    <SystemContext.Provider
      value={{
        theme: experimentalTheme,
        cn: experimentalCsx,
        cx,
      }}
    >
      <IconProvider>
        <Helmet>
          <link
            rel="preload"
            href="https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-VF-May-5-2022.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Helmet>
        {children}
      </IconProvider>
    </SystemContext.Provider>
  )
}
