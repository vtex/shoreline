import type { ReactElement } from 'react'
import React from 'react'
import type { Plugin, ThemeOptions } from '@vtex/onda-system'
import { buildRuntime, buildPlugins, createTheme } from '@vtex/onda-system'
import { theme } from '@vtex/admin-ui-theme'
import { isKebab } from '@vtex/onda-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'

import { plugins } from './plugins'
import type { StyleProp } from './runtime'
import { runtime as runtimeEmotion } from './runtime'
import { useCSSVariables } from './hooks/useCSSVariables'

export interface OndaSpec<Theme extends Record<string, any>> {
  name: string
  description: string
  theme: Theme
  plugins: Array<Plugin<Theme>>
  options?: ThemeOptions
}

export interface OndaInstanceSpec {
  name: string
  description: string
  options?: ThemeOptions
}

/**
 * It creates the Admin UI Design System instance
 *
 * @Example
 * const OndaProvider = createOndaInstance({ name: 'admin-app-name', description: 'Admin app description' })
 */
export function createOndaInstance(spec: OndaInstanceSpec) {
  const { name, description, options } = spec

  invariant(
    isKebab(name),
    '"name" property must be in kebab-case format on createOndaInstance function'
  )

  return createOnda({ name, description, plugins, theme, options })
}

export const SystemContext = React.createContext<{
  theme: any
  cn: (styleProp: StyleProp) => string
  instance: any
  about: {
    name: string
    description: string
  }
} | null>(null)

export function useSystem() {
  const ctx = React.useContext(SystemContext)

  invariant(
    ctx,
    'Waaaait! Something is wrong, make sure you are using the useSystem() hook under an Onda provider.'
  )

  return ctx
}

export type DesignSystem = (props: {
  children?: React.ReactNode
}) => ReactElement

export function createOnda<Theme extends Record<string, any>>(
  spec: OndaSpec<Theme>
): DesignSystem {
  const { name, description, theme: themeConfig, options } = spec

  const [{ global, ...strictTheme }, cssVariables] = createTheme(
    themeConfig,
    options
  )

  invariant(
    isKebab(name),
    '"name" property must be in kebab-case format on createOnda function'
  )

  const steps = buildPlugins(strictTheme, plugins)
  const {
    exec: cn,
    parse,
    instance: { emotion, Global, CacheProvider },
  } = buildRuntime({ id: name }, steps, runtimeEmotion)

  const globalStyles = parse.exec(global)
  const theme = steps.entries.exec(strictTheme)

  function SystemProvider(props: { children?: React.ReactNode }) {
    const { children } = props

    useCSSVariables(cssVariables)

    return (
      <CacheProvider value={emotion.cache}>
        <SystemContext.Provider
          value={{
            theme,
            cn,
            instance: emotion,
            about: {
              name,
              description,
            },
          }}
        >
          <Helmet>
            <link
              rel="preload"
              href="https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-Variable.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          </Helmet>
          <Global styles={globalStyles} />
          {children}
        </SystemContext.Provider>
      </CacheProvider>
    )
  }

  return SystemProvider
}
