import { merge } from '@vtex/admin-ui-system'

import { colors } from '../base'

const inputStyle = {
  fontFamily: 'sans',
  fontSettings: 'regular',
  width: 'full',
  height: 48,
  borderStyle: 'solid',
  borderWidth: 1,
  paddingLeft: 3,
  paddingRight: 4,
  borderColor: 'mid.secondary',
  borderRadius: 'default',
  bg: 'inherit',
  marginY: 1,
  fontSize: 1,
  color: 'dark.primary',
  outline: 0,
  transition: 'snap',
  ':hover': {
    borderColor: 'dark.primary',
  },
  ':focus': {
    borderColor: 'blue',
    boxShadow: `0 0 0 1px  ${colors.blue.default}`,
  },
  ':disabled': {
    bg: 'light.secondary',
    borderColor: 'mid.primary',
    color: 'mid.primary',
  },
  ':focus + label': {
    transform: 'translate(1px, 4px) scale(0.875)',
  },
  ':placeholder-shown:not(:focus) + label': {
    paddingTop: 1,
  },
  ':not(:placeholder-shown) + label': {
    transform: 'translate(1px, 4px) scale(0.875)',
  },
}

const errorState = {
  borderColor: 'red',
  ':focus': {
    borderColor: 'red',
    boxShadow: `0 0 0 1px  ${colors.red.default}`,
  },
  ':hover': {
    borderColor: 'red.hover',
  },
}

function getInputVariants(name: string, styles = {}) {
  return {
    // input variants
    [`${name}`]: merge(inputStyle, styles),
    [`${name}-icon`]: merge(inputStyle, styles, { paddingLeft: 44 }),
    [`${name}-suffix`]: merge(inputStyle, styles, { paddingRight: '64px' }),
    [`${name}-clear`]: merge(inputStyle, styles, { paddingRight: '44px' }),
    [`${name}-icon-clear`]: merge(inputStyle, styles, {
      paddingLeft: '44px',
      paddingRight: '44px',
    }),
    [`${name}-icon-suffix`]: merge(inputStyle, styles, {
      paddingRight: '64px',
      paddingLeft: '44px',
    }),
    [`${name}-suffix-clear`]: merge(inputStyle, styles, {
      paddingRight: '75px',
    }),
    [`${name}-icon-suffix-clear`]: merge(inputStyle, styles, {
      paddingLeft: '44px',
      paddingRight: '75px',
    }),
  }
}

export default {
  // input container
  container: { position: 'relative' },
  'container-icon': {
    position: 'relative',
    label: {
      left: '44px',
    },
  },

  // input suffix
  suffix: {
    color: 'mid.primary',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    borderLeftColor: 'mid.secondary',
    paddingTop: '14px',
    marginTop: 'px',
    width: '32px',
    paddingLeft: 3,
    lineHeight: 'body',
    fontSettings: 'regular',
    fontSize: 1,
  },

  // left icon style
  icon: {
    color: 'mid.primary',
    top: 1,
    left: 0,
    marginX: 3,
    marginTop: '14px',
    position: 'absolute',
    height: 20,
    width: 20,
    minWidth: 20,
    minHeight: 20,
  },

  // button container
  buttons: {
    right: 0,
    top: 1,
    height: 46,
    paddingRight: 3,
    position: 'absolute',
    display: 'flex',
    color: 'dark.secondary',
  },
  ...getInputVariants('input'),
  ...getInputVariants('input-error', errorState),
}
