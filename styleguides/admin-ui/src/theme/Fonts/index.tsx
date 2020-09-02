import React, { memo } from 'react'
import { Global, css } from '@emotion/core'

import VtexTrustVariableWoff from './VtexTrustVariable.woff'
import VtexTrustVariableWoff2 from './VtexTrustVariable.woff2'

/**
 * Defines & applies VTEX Trust font
 */
function Fonts() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'VTEX Trust';
          src: url(${VtexTrustVariableWoff2}) format('woff2-variations'),
            url(${VtexTrustVariableWoff}) format('woff-variations');
          font-weight: normal;
          font-style: normal;
        }
        @supports (font-variation-settings: normal) {
          html,
          body,
          * {
            font-family: 'SourceSansVariable', sans-serif;
            font-variation-settings: 'wght' 90;
          }
        }
        html,
        body,
        * {
          font-family: 'VTEX Trust', sans-serif;
          font-weight: 400;
        }
      `}
    />
  )
}

export default memo(Fonts)
