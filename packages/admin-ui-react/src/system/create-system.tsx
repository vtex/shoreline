import React from 'react'
import { createCsx, theme, styles } from '@vtex/admin-ui-core'
import type { ReactElement, PropsWithChildren } from 'react'
import { isKebab } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'
import type {
  Options as CreateEmotionOptions,
  Emotion,
} from '@emotion/css/create-instance'
import createEmotion from '@emotion/css/create-instance'
import { CacheProvider, Global } from '@emotion/react'

/** focus-visible polyfill  */
import 'focus-visible/dist/focus-visible'

import { IconProvider } from './icons'
import { SystemContext } from './context'

export function createSystem(spec: CreateSystemOptions): CreateSystemReturn {
  const {
    key,
    experimentalTheme,
    experimentalDisabledGlobalStyles = false,
    experimentalEmotionOptions = {},
  } = spec

  invariant(
    isKebab(key),
    '"key" property must be in kebab-case format on createSystem function'
  )

  const emotion = createEmotion({
    key,
    ...experimentalEmotionOptions,
  })

  const csx = createCsx(emotion, experimentalTheme)

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
                href="https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-VF.woff2"
                as="font"
                type="font/woff2"
                crossOrigin="anonymous"
              />
            </Helmet>
            {!experimentalDisabledGlobalStyles && (
              <Global styles={styles(theme.global)} />
            )}
            {children}
          </IconProvider>
        </SystemContext.Provider>
      </CacheProvider>
    )
  }

  return [SystemProvider, emotion]
}

export interface CreateSystemOptions {
  /** Kebab-case key */
  key: string
  /** Custom theme */
  experimentalTheme?: any
  /** Options of the created emotion instance */
  experimentalEmotionOptions?: Omit<CreateEmotionOptions, 'key'>
  /** Disable global styles */
  experimentalDisabledGlobalStyles?: boolean
}

export type CreateSystemReturn = [
  (props: PropsWithChildren<{}>) => ReactElement,
  Emotion
]
