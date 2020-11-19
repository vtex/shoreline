const styles = {
  fontSize: 14,
  width: 106,
  height: 48,
  appearance: 'none',
  '::-webkit-inner-spin-button ': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  paddingLeft: 36,
  paddingRight: 36,
  textAlign: 'center',
  color: 'black',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'muted.0',
  borderRadius: 'default',
  backgroundColor: 'primary.accent',
  ':hover': {
    borderColor: 'black',
  },
  ':disabled': {
    backgroundColor: 'muted.3',
    color: 'muted.0',
  },
  ':focus:not([data-focus-visible-added])': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'focus',
  },
}

const buttonStyle = {
  position: 'absolute',
  top: 14,
  height: 20,
  width: 20,
  cursor: 'pointer',
  borderRadius: 'default',
  backgroundColor: 'transparent',
  color: 'primary.base',
  ':hover': {
    color: 'primary.hover',
  },
  ':focus:not([data-focus-visible-added])': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'focus',
  },
  ':disabled': {
    color: 'muted.0',
  },
  '> div': {
    display: 'flex',
    height: 'full',
    width: 'full',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default {
  error: {
    ...styles,
    borderColor: 'danger.base',
    ':hover': {
      borderColor: 'danger.base',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
  default: {
    ...styles,
  },
  buttonMinus: {
    ...buttonStyle,
    left: 12,
  },
  buttonPlus: {
    ...buttonStyle,
    right: 12,
  },
}
