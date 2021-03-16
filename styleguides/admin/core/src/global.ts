import { theme } from '@vtex/admin-ui-theme'
import { Global, css } from '@emotion/react'
import { Helmet } from 'react-helmet'
import { jsxs, styles } from './system'

const imports =
  theme.global?.imports?.reduce(
    (acc, link) => `${acc} @import '${link}';`,
    ''
  ) ?? ''

export function Imports() {
  return jsxs(Global, {
    styles: css`
      ${imports}
    `,
  })
}

export function FontsPreload() {
  return jsxs(
    Helmet,
    {},
    ...[
      jsxs('link', {
        rel: 'preload',
        href:
          'https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-Variable.woff2',
        as: 'font',
        type: 'font/woff2',
      }),
      jsxs('link', {
        rel: 'preload',
        href:
          'https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-Variable.woff',
        as: 'font',
        type: 'font/woff',
      }),
    ]
  )
}

export function Styles() {
  return jsxs(Global, {
    styles: styles(theme?.global?.styles)(theme),
  })
}
