import { SxStyleProp } from 'theme-ui'

const styles: SxStyleProp = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 8,
  height: 8,
  padding: 5,
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
    bg: 'primary.washed',
    color: 'primary.base',
  },
  danger: {
    ...styles,
    bg: 'danger.washed',
    color: 'danger.base',
  },
  success: {
    ...styles,
    bg: 'success.washed',
    color: 'success.base',
  },
}
