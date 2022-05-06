import React from 'react'
import { createCsx, theme } from '@vtex/admin-ui-core'
import type { ReactElement, PropsWithChildren } from 'react'
import { isKebab } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

import { IconProvider } from './icons'
import { SystemContext } from './context'

export function createSystem(spec: CreateSystemOptions): CreateSystemReturn {
  const { key, experimentalTheme } = spec

  invariant(
    isKebab(key),
    '"key" property must be in kebab-case format on createSystem function'
  )

  const csx = createCsx(experimentalTheme)

  function SystemProvider(props: PropsWithChildren<{}>) {
    const { children } = props

    return (
      <SystemContext.Provider
        value={{
          theme,
          cn: csx,
        }}
      >
        <IconProvider>
          <Helmet>
            <link
              rel="preload"
              href="https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-VF.woff2"
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
  /** Kebab-case key */
  key: string
  /** Custom theme */
  experimentalTheme?: any
  /** Disable global styles */
  experimentalDisabledGlobalStyles?: boolean
}

export type CreateSystemReturn = [
  (props: PropsWithChildren<{}>) => ReactElement
]
