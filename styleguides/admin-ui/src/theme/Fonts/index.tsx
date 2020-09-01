import React, { memo } from 'react'
import { Global, css } from '@emotion/core'

import RegularWoff from './regular.woff'
import RegularWoff2 from './regular.woff2'
import MediumWoff from './medium.woff'
import MediumWoff2 from './medium.woff2'

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
            url(${RegularWoff2}) format('woff2'),
            url(${RegularWoff}) format('woff');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'VTEX Trust';
          src: local('VTEX Trust'), local('VTEX Trust'),
            url(${MediumWoff2}) format('woff2'),
            url(${MediumWoff}) format('woff');
          font-weight: 500;
          font-style: normal;
        }
        * {
          font-family: 'VTEX Trust', sans-serif;
        }
      `}
    />
  )
}

export default memo(Fonts)
