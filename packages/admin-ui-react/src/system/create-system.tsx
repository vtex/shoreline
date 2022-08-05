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

const csx = createCsx(theme) // get from core - defaultCsx

interface ThemeProviderProps {
  children?: ReactNode
  experimentalTheme?: any
  experimentalDisabledGlobalStyles?: boolean
}

/* 
const theme = {
  bg: {
    primary: 'white',
    secondary: 'grey'
  }
}


// core

const theme = createTheme(theme)

// returned theme
const theme = {
  bg: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
  }
}

// varans
const vars = {
  '--bg-primary': 'white',
  '--bg-secondary': 'grey'
}

global({
  ':root': vars
})

*/

export function ThemeProvider(props: ThemeProviderProps) {
  const {
    children,
    experimentalTheme,
    experimentalDisabledGlobalStyles = false,
  } = props

  const contextCsx = experimentalTheme ? createCsx(experimentalTheme) : csx
  const contextTheme = experimentalTheme ?? theme

  const global = experimentalDisabledGlobalStyles
    ? {}
    : experimentalTheme?.global ?? {}

  console.log({
    cssVariables,
  })

  globalCss(styles(theme.global) as any)()
  globalCss({
    ':root': cssVariables,
  } as any)()

  return (
    <SystemContext.Provider
      value={{
        theme: contextTheme,
        cn: contextCsx,
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
