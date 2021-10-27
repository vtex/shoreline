import React from 'react'
import type { StyleProp, UnstableAdminUI } from '@vtex/admin-ui-core'
import {
  cssVariables,
  styles,
  theme,
  globalStyles,
  createAtoms,
  createClsx,
} from '@vtex/admin-ui-core'
import type { ReactElement } from 'react'
import { isKebab } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'
import type { Emotion } from '@emotion/css/create-instance'
import createEmotion from '@emotion/css/create-instance'
import { CacheProvider, Global } from '@emotion/react'
import { ColorModeProvider } from './colorMode'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

export interface SystemSpec {
  key?: string
  emotionInstance?: Emotion
  unstableSystem?: UnstableAdminUI
  mode?: string
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

export type CreateOndaReturn = [
  (props: { children?: React.ReactNode }) => ReactElement
]

export function createSystem(spec: SystemSpec): CreateOndaReturn {
  const { key, emotionInstance, unstableSystem, mode } = spec

  invariant(
    key || emotionInstance,
    'Either "key" or "emotionInstance" must be provided on createSystem function'
  )

  let emotion: Emotion

  if (emotionInstance) {
    emotion = emotionInstance
  } else {
    const stringKey = key as string

    invariant(
      isKebab(stringKey),
      '"key" property must be in kebab-case format on createSystem function'
    )

    emotion = createEmotion({
      key: stringKey,
    })
  }

  const clsx = createClsx(emotion)
  const atoms = createAtoms(unstableSystem?.styles ?? styles, clsx)

  function SystemProvider(props: { children?: React.ReactNode }) {
    const { children } = props

    return (
      <CacheProvider value={emotion.cache}>
        <SystemContext.Provider
          value={{
            theme: unstableSystem?.theme ?? theme,
            cn: atoms,
            cx: emotion.cx,
            keyframes: emotion.keyframes,
          }}
        >
          <ColorModeProvider
            cssVariables={unstableSystem?.cssVariables ?? cssVariables}
            defaultColorMode={mode}
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
            <Global styles={unstableSystem?.globalStyles ?? globalStyles} />
            {children}
          </ColorModeProvider>
        </SystemContext.Provider>
      </CacheProvider>
    )
  }

  return [SystemProvider]
}
