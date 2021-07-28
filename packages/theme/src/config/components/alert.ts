import { lightness } from '@vtex/admin-ui-system'

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 48,
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
  a: {
    fontSettings: 'medium',
  },
}

const visible = {
  opacity: 1,
  visibility: 'visible',
  transform: 'translate3d(0, 0, 0)',
}

const error = {
  ...styles,
  bg: lightness('red.secondary.default', 0.94),
  borderColor: 'red.secondary',
}

const success = {
  ...styles,
  bg: lightness('green.secondary.default', 0.94),
  borderColor: 'green.secondary',
}

const warning = {
  ...styles,
  bg: lightness('yellow.secondary.default', 0.94),
  borderColor: 'yellow.secondary',
}

const info = {
  ...styles,
  bg: 'light.secondary',
  borderColor: 'blue.secondary',
}

const fluid = {
  height: 'full',
  alignItems: 'flex-start',
}

const sticky = {
  borderRadius: 'flat',
  paddingRight: 4,
}

function getAlertVariants(name: string, styles = {}) {
  return {
    [`${name}`]: styles,
    [`${name}-visible`]: { ...styles, ...visible },
    [`${name}-fluid`]: { ...styles, ...fluid },
    [`${name}-sticky`]: { ...styles, ...sticky },
    [`${name}-visible-fluid`]: { ...styles, ...visible, ...fluid },
    [`${name}-visible-sticky`]: { ...styles, ...visible, ...sticky },
    [`${name}-fluid-sticky`]: { ...styles, ...visible, ...sticky },
    [`${name}-visible-fluid-sticky`]: {
      ...styles,
      ...visible,
      ...sticky,
      ...fluid,
    },
  }
}

export default {
  ...getAlertVariants('error', error),
  ...getAlertVariants('warning', warning),
  ...getAlertVariants('info', info),
  ...getAlertVariants('success', success),
}
