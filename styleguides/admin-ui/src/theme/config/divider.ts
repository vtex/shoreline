import colors from './colors'
import sizes from './sizes'

const styles = {
  border: `${sizes[1]} solid ${colors.muted[3]}`,
}

export default {
  horizontal: {
    ...styles,
    marginY: 4,
    borderBottom: 0,
  },
  vertical: {
    ...styles,
    marginX: 4,
    borderLeft: 0,
  },
}
