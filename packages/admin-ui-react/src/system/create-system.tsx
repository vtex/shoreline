import React from 'react'
import {
  createCsx,
  theme,
  cssVars,
  styles,
  globalCss,
  cx,
  applyCSSVars,
} from '@vtex/admin-ui-core'
import type { ReactElement, PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

import { IconProvider } from './icons'
import { SystemContext } from './context'

export function createSystem(
  spec: CreateSystemOptions = {}
): CreateSystemReturn {
  const {
    experimentalTheme = theme,
    experimentalDisabledGlobalStyles = false,
  } = spec

  const csx = createCsx(experimentalTheme)

  const global = experimentalDisabledGlobalStyles
    ? {}
    : experimentalTheme.global

  globalCss(styles(global) as any)()
  applyCSSVars(cssVars)

  function SystemProvider(props: PropsWithChildren<{}>) {
    const { children } = props

    return (
      <SystemContext.Provider
        value={{
          theme: experimentalTheme,
          cn: csx,
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

  return [SystemProvider]
}

export interface CreateSystemOptions {
  /** Custom theme */
  experimentalTheme?: any
  /** Disable global styles */
  experimentalDisabledGlobalStyles?: boolean
}

export type CreateSystemReturn = [
  (props: PropsWithChildren<{}>) => ReactElement
]
