import { theme } from '@vtex/admin-ui-theme'
import { Global, css } from '@emotion/react'
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

export function Styles() {
  return jsxs(Global, {
    styles: styles(theme?.global?.styles)(theme),
  })
}
