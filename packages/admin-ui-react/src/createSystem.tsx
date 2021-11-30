import React, { Fragment } from 'react'
import type { StyleProp, UnstableAdminUI } from '@vtex/admin-ui-core'
import {
  createAtoms,
  createClsx,
  defaultSystemInstance,
} from '@vtex/admin-ui-core'
import type { ReactElement, PropsWithChildren } from 'react'
import { isKebab } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'
import type { Emotion } from '@emotion/css/create-instance'
import createEmotion from '@emotion/css/create-instance'
import { CacheProvider, Global } from '@emotion/react'

import { ThemeModeProvider } from './themeMode'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'
import { IconProvider } from './createIcons'

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
    'Waaaait! Something is wrong, make sure you are using the useSystem() hook under an AdminUI provider.'
  )

  return ctx
}

export type CreateAdminUIReturn = [
  (props: PropsWithChildren<{}>) => ReactElement
]

export function createSystem(spec: SystemSpec): CreateAdminUIReturn {
  const {
    key,
    emotionInstance,
    unstableSystem = defaultSystemInstance,
    mode = 'main',
  } = spec

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
  const atoms = createAtoms(unstableSystem.styles, clsx)

  const Wrapper = unstableSystem.themeOptions.enableModes
    ? function ThemeWrapper(props: PropsWithChildren<{}>) {
        return (
          <ThemeModeProvider
            styleObject={unstableSystem.rootStyleObject}
            defaultThemeMode={mode}
          >
            {props.children}
          </ThemeModeProvider>
        )
      }
    : Fragment

  function SystemProvider(props: PropsWithChildren<{}>) {
    const { children } = props

    return (
      <CacheProvider value={emotion.cache}>
        <SystemContext.Provider
          value={{
            theme: unstableSystem.theme,
            cn: atoms,
            cx: emotion.cx,
            keyframes: emotion.keyframes,
          }}
        >
          <IconProvider>
            <Wrapper>
              <Helmet>
                <link
                  rel="preload"
                  href="https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-Variable.woff2"
                  as="font"
                  type="font/woff2"
                  crossOrigin="anonymous"
                />
              </Helmet>
              <Global styles={unstableSystem.globalStyles} />
              {children}
            </Wrapper>
          </IconProvider>
        </SystemContext.Provider>
      </CacheProvider>
    )
  }

  return [SystemProvider]
}
