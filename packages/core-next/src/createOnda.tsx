import type { ReactElement } from 'react'
import React from 'react'
import type { Plugin, ThemeOptions } from './system'
import { buildPlugins, createTheme } from './system'
import { theme } from '@vtex/admin-ui-theme'
import { isKebab } from '@vtex/onda-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'

import { plugins } from './plugins'
import type { StyleProp } from './runtime'
import { useCSSVariables } from './hooks/useCSSVariables'
import createEmotion from '@emotion/css/create-instance'
import { createAtoms, createClsx, createParser } from './runtime/emotion'
import { CacheProvider, Global } from '@emotion/react'

export interface OndaSpec<Theme extends Record<string, any>> {
  name: string
  theme: Theme
  plugins: Array<Plugin<Theme>>
  options?: ThemeOptions
}

export interface OndaInstanceSpec {
  name: string
  options?: ThemeOptions
}

/**
 * It creates the Admin UI Design System instance
 *
 * @Example
 * const OndaProvider = createOndaInstance({ name: 'admin-app-name' })
 */
export function createOndaInstance(spec: OndaInstanceSpec) {
  const { name, options } = spec

  invariant(
    isKebab(name),
    '"name" property must be in kebab-case format on createOndaInstance function'
  )

  return createOnda({ name, plugins, theme, options })
}

export const SystemContext = React.createContext<{
  theme: any
  cn: (styleProp: StyleProp) => string
  instance: any
  about: {
    name: string
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
  const { name, theme: themeConfig, options } = spec

  invariant(
    isKebab(name),
    '"name" property must be in kebab-case format on createOnda function'
  )

  const emotion = createEmotion({
    key: name,
  })

  const [{ global, ...strictTheme }, cssVariables] = createTheme(
    themeConfig,
    options
  )

  const steps = buildPlugins(strictTheme, plugins)
  const parse = createParser(steps)
  const clsx = createClsx(emotion)
  const atoms = createAtoms(parse, clsx)

  const globalStyles = parse(global)
  const theme = steps.entries.exec(strictTheme)

  function SystemProvider(props: { children?: React.ReactNode }) {
    const { children } = props

    console.log(cssVariables)

    useCSSVariables(cssVariables)

    return (
      <CacheProvider value={emotion.cache}>
        <SystemContext.Provider
          value={{
            theme,
            cn: atoms,
            instance: emotion,
            about: {
              name,
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
