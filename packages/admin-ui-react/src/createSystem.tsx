import React from 'react'
import { createCsx, theme, styles } from '@vtex/admin-ui-core'
import type { ReactElement, PropsWithChildren } from 'react'
import { isKebab } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'
import type { Emotion } from '@emotion/css/create-instance'
import createEmotion from '@emotion/css/create-instance'
import { CacheProvider, Global } from '@emotion/react'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'
import { IconProvider } from './createIcons'
import { SystemContext } from './context'

export interface SystemSpec {
  key?: string
  emotionInstance?: Emotion
  __theme?: any
}

export type CreateAdminUIReturn = [
  (props: PropsWithChildren<{}>) => ReactElement
]

export function createSystem(spec: SystemSpec): CreateAdminUIReturn {
  const { key, emotionInstance, __theme } = spec

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

  const csx = createCsx(emotion, __theme)

  function SystemProvider(props: PropsWithChildren<{}>) {
    const { children } = props

    return (
      <CacheProvider value={emotion.cache}>
        <SystemContext.Provider
          value={{
            theme,
            cn: csx,
            cx: emotion.cx,
            keyframes: emotion.keyframes,
          }}
        >
          <IconProvider>
            <Helmet>
              <link
                rel="preload"
                href="https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-Variable.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
            </Helmet>
            <Global styles={styles(theme.global)} />
            {children}
          </IconProvider>
        </SystemContext.Provider>
      </CacheProvider>
    )
  }

  return [SystemProvider]
}
