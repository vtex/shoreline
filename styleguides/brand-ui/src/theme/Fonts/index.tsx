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
          font-family: 'VTEX Trust Variable';
          src: url(${VtexTrustVariableWoff2}) format('woff2'),
            url(${VtexTrustVariableWoff}) format('woff');
          font-weight: normal;
          font-style: normal;
        }
        html,
        body,
        * {
          font-family: 'VTEX Trust Variable', -apple-system, system-ui,
            BlinkMacSystemFont, sans-serif;
        }
      `}
    />
  )
}

export default memo(Fonts)
