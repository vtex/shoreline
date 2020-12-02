import { merge } from '@vtex/admin-ui-system'

import { colors } from '../base'

const inputStyle = {
  fontSettings: 'regular',
  width: 'full',
  height: 48,
  borderStyle: 'solid',
  borderWidth: 1,
  paddingLeft: 3,
  paddingRight: 4,
  borderColor: 'muted.2',
  borderRadius: 'default',
  bg: 'inherit',
  marginY: 1,
  fontSize: 1,
  color: 'text.primary',
  outline: 0,
  transition: 'snap',
  ':hover': {
    borderColor: 'text.primary',
  },
  ':focus': {
    borderColor: 'primary.base',
    boxShadow: `0 0 0 1px  ${colors.primary.base}`,
  },
  ':disabled': {
    bg: 'muted.3',
    borderColor: 'muted.0',
    color: 'muted.0',
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
  borderColor: 'danger.base',
  ':focus': {
    borderColor: 'danger.base',
    boxShadow: `0 0 0 1px  ${colors.danger.base}`,
  },
  ':hover': {
    borderColor: 'danger.hover',
  },
}

function getInputVariants(name: string, styles: object = {}) {
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
    color: 'muted.0',
    borderLeftStyle: 'solid',
    borderLeftWidth: '1px',
    borderLeftColor: 'muted.2',
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
    color: 'muted.0',
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
    color: 'text.secondary',
  },
  ...getInputVariants('input'),
  ...getInputVariants('input-error', errorState),
}
