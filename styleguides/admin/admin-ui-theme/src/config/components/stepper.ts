const styles = {
  fontSize: 14,
  width: 106,
  appearance: 'none',
  '::-webkit-inner-spin-button ': {
    WebkitAppearance: 'none',
    margin: 0,
  },
  paddingLeft: 36,
  paddingRight: 36,
  textAlign: 'center',
  height: 45,
  color: 'basic.black',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#898F9E',
  borderRadius: 'default',
  backgroundColor: 'primary.accent',
  ':hover': {
    borderColor: '#323845',
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
  disable: {
    ...styles,
    backgroundColor: '#F4F6FB',
    ':hover': { borderColor: 'none' },
    ':focus': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
  usual: {
    ...styles,
  },
}
