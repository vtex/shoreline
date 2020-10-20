import React, { memo } from 'react'
import { Global, css } from '@emotion/core'

/**
 * Defines & applies VTEX Trust font
 */
function Fonts() {
  return (
    <Global
      styles={css`
        @import 'https://io.vtex.com.br/fonts/vtex-trust/style.css';
        code > * > *,
        pre > * > *,
        code,
        pre {
          font-family: 'Dank Mono', 'Operator Mono', 'Fira Code Retina',
            'Fira Code', 'FiraCode-Retina', Consolas, Monaco, monospace !important;
        }
        html,
        body,
        * {
          font-family: VTEXTrustVF, -apple-system, system-ui, BlinkMacSystemFont,
            sans-serif !important;
          font-variation-settings: 'wght' 92;
        }
      `}
    />
  )
}

export default memo(Fonts)
