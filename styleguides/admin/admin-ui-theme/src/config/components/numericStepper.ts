const styles = {
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

const containerStyles = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: 48,
  width: 106,
  paddingY: 12,
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
  container: {
    ...containerStyles,
  },
}
