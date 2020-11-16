import { keyframes } from '@vtex/admin-ui-system'

import { colors } from '../base'

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
  backgroundColor: 'muted.3',
  backgroundSize: `200px 100%`,
  backgroundRepeat: 'no-repeat',
  lineHeight: 1,
  borderRadius: 3,
  backgroundImage: `linear-gradient(
    90deg,
    ${colors.muted[3]},
    white,
    ${colors.muted[3]}
  )`,
  animation: `${load} 1.2s ease-in-out infinite`,
}

export default {
  rect: {
    ...styles,
    borderRadius: 'default',
  },
  circle: {
    ...styles,
    borderRadius: 'circle',
  },
}
