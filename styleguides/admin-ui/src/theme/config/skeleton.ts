import { keyframes } from '@emotion/core'

import colors from './colors'

const load = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

const styles = {
  display: 'inline-block',
  width: 'full',
  height: 'full',
  backgroundColor: 'muted.4',
  backgroundSize: `200px 100%`,
  backgroundRepeat: 'no-repeat',
  lineHeight: 1,
  borderRadius: 3,
  backgroundImage: `linear-gradient(
    90deg,
    ${colors.muted[4]},
    white,
    ${colors.muted[4]}
  )`,
  animation: `${load} 1.2s ease-in-out infinite`,
}

export default {
  skeleton: {
    ...styles,
    borderRadius: 3,
  },
  'skeleton-circle': {
    ...styles,
    borderRadius: '100%',
  },
}
