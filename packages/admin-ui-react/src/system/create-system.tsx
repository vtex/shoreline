import React from 'react'
import { createCsx, styles, theme } from '@vtex/admin-ui-core'
import type { ReactElement, PropsWithChildren } from 'react'
import { isKebab } from '@vtex/admin-ui-util'
import invariant from 'tiny-invariant'
import { Helmet } from 'react-helmet'
import type {
  Options as CreateEmotionOptions,
  Emotion,
} from '@emotion/css/create-instance'
import createEmotion from '@emotion/css/create-instance'
import { CacheProvider } from '@emotion/react'
import { globalCss } from '@stitches/core'

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

  const csx = createCsx(experimentalTheme)

  const cx = (...args: string[]) => args.join(' ')
  const global = experimentalDisabledGlobalStyles ? {} : theme.global

  globalCss(styles(global) as any)

  function SystemProvider(props: PropsWithChildren<{}>) {
    const { children } = props

    return (
      <CacheProvider value={emotion.cache}>
        <SystemContext.Provider
          value={{
            theme,
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
