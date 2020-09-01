import React, { memo } from 'react'
import { Global, css } from '@emotion/core'

// import VariableWoff from './variable.woff'
import VariableWoff2 from './variable.woff2'

/**
 * Defines & applies VTEX Trust font
 */
function Fonts() {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'VTEX Trust';
          src: local('VTEX Trust'), local('VTEX Trust'),
            url(${VariableWoff2}) format('woff2-variations'),
          font-weight: 1 999;
          font-style: normal;
        }
        html, * {
          font-family: 'VTEX Trust', sans-serif;
        }
      `}
    />
  )
}

export default memo(Fonts)
