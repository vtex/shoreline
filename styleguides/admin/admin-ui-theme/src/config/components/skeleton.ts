import { colors } from '../base'

const styles = {
  display: 'inline-block',
  width: 'full',
  height: 'full',
  backgroundColor: 'light.secondary',
  backgroundSize: `200px 100%`,
  backgroundRepeat: 'no-repeat',
  lineHeight: 1,
  borderRadius: 3,
  backgroundImage: `linear-gradient(
    90deg,
    ${colors.light.secondary},
    white,
    ${colors.light.secondary}
  )`,
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
