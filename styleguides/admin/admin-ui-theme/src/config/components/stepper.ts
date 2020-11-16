const styles = {
  display: 'flex',
  alignItems: 'center',
  height: 48,
  width: 106,
  paddingLeft: 12,
  paddingRight: 12,
  paddingY: 14,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: '#898F9E',
  borderRadius: 'default',
  backgroundColor: 'primary.contrast',
  ':hover': {
    borderColor: '#323845',
  },
  ':active': {
    borderColor: '#898F9E',
    boxShadow: `${`0 0 0 1px  white,0 0 0 3px  #8DB6FA`}`,
    outline: 'none',
  },
}

export default {
  error: {
    ...styles,
    borderColor: 'danger.base',
    ':hover': {
      borderColor: 'danger.base',
    },
    ':active': {
      borderColor: 'danger.base',
      boxShadow: 'none',
    },
  },
  disable: {
    ...styles,
    backgroundColor: '#F4F6FB',
    ':hover': { borderColor: 'none' },
    ':active': { borderColor: 'none', boxShadow: 'none' },
  },
  usual: {
    ...styles,
  },
}
