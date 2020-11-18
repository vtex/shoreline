import { lightness } from '@vtex/admin-ui-system'

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 56,
  paddingY: 3,
  paddingLeft: 4,
  paddingRight: 3,
  borderRadius: 'default',
  opacity: 0,
  zIndex: 999,
  transform: 'translate3d(0, -10px, 0)',
  visibility: 'hidden',
  transition: 'pop',
  borderStyle: 'solid',
  borderWidth: 1,
}

const visible = {
  opacity: 1,
  visibility: 'visible',
  transform: 'translate3d(0, 0, 0)',
}

const error = {
  ...styles,
  bg: lightness('danger.washed.base', 0.94),
  borderColor: 'danger.washed.base',
}

const success = {
  ...styles,
  bg: lightness('success.washed.base', 0.94),
  borderColor: 'success.washed.base',
}

const warning = {
  ...styles,
  bg: lightness('warning.washed.base', 0.94),
  borderColor: 'warning.washed.base',
}

const info = {
  ...styles,
  bg: lightness('secondary.base', 0.94),
  borderColor: 'secondary.base',
}

export default {
  error,
  'error-visible': {
    ...error,
    ...visible,
  },
  success,
  'success-visible': {
    ...success,
    ...visible,
  },
  warning,
  'warning-visible': {
    ...warning,
    ...visible,
  },
  info,
  'info-visible': {
    ...info,
    ...visible,
  },
}
