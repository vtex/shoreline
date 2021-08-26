import React from 'react'
import type { ReactElement } from 'react'
import { theme as adminTheme } from '@vtex/admin-ui-theme'
import { isKebab } from '@vtex/onda-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'
import type { Emotion } from '@emotion/css/create-instance'
import createEmotion from '@emotion/css/create-instance'
import { CacheProvider, Global } from '@emotion/react'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

import type { Plugin } from './system'
import { buildPlugins } from './system'
import { plugins } from './plugins'
import type { StyleProp } from './runtime'
import type { ThemeOptions } from './theme'
import { createTheme, useCSSVariables } from './theme'
import { createAtoms, createClsx, createParser } from './runtime'

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

  return createOnda({ name, plugins, theme: adminTheme, options })
}

export const SystemContext = React.createContext<
  | ({
      theme: any
      cn: (styleProp: StyleProp) => string
    } & Pick<Emotion, 'cx' | 'keyframes'>)
  | null
>(null)

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
  const {
    name,
    theme: themeConfig,
    options = {
      disableCSSVariables: true,
    },
  } = spec

  invariant(
    isKebab(name),
    '"name" property must be in kebab-case format on createOnda function'
  )

  const emotion = createEmotion({
    key: name,
  })

  const { global, ...rest } = themeConfig
  const [theme, cssVariables] = createTheme(rest, options)
  const steps = buildPlugins(theme, plugins)
  const parse = createParser(steps, theme)
  const clsx = createClsx(emotion)
  const atoms = createAtoms(parse, clsx)
  const globalStyles = parse(global?.styles ?? {})

  function SystemProvider(props: { children?: React.ReactNode }) {
    const { children } = props

    useCSSVariables(cssVariables)

    return (
      <CacheProvider value={emotion.cache}>
        <SystemContext.Provider
          value={{
            theme,
            cn: atoms,
            cx: emotion.cx,
            keyframes: emotion.keyframes,
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
