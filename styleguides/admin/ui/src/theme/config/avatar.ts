import { SxStyleProp } from 'theme-ui'

const styles: SxStyleProp = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: 2,
  borderRadius: 'full',
  textTransform: 'uppercase',
}

export default {
  base: {
    ...styles,
    bg: 'muted.4',
    color: 'text',
  },
  primary: {
    ...styles,
    bg: 'primary.washed.0',
    color: 'primary.base',
  },
  danger: {
    ...styles,
    bg: 'danger.washed.0',
    color: 'danger.base',
  },
  success: {
    ...styles,
    bg: 'success.washed.0',
    color: 'success.base',
  },
}
