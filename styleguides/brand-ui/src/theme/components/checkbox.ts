const styles = {
  marginY: 0,
  marginLeft: 0,
  marginRight: 3,
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'muted.1',
  borderRadius: 2,
  height: 16,
  width: 16,
  minWidth: 16,
  appearance: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':checked': {
    backgroundColor: 'primary.base',
    borderColor: 'primary.base',
    ':after': {
      content: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
    },
    ':disabled': {
      backgroundColor: 'muted.2',
      border: 'none',
      color: 'muted.1',
      ':after': {
        content: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='%238B9299' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
      },
    },
  },
  ':disabled': {
    borderColor: 'muted.2',
  },
  ':focus': {
    boxShadow: (t: any) => `0 0 0 ${t.borderWidths[1]}px ${t.colors.focus}`,
    outline: 'none',
  },
}

export default {
  ...styles,
  container: {
    width: 'fit-content',
  },
  error: {
    ...styles,
    borderColor: 'danger.base',
  },
  errorMessage: {
    fontSize: 0,
    color: 'danger.base',
    marginTop: 2,
  },
  label: {
    color: 'secondary.base',
    alignItems: 'center',
    disabled: {
      color: 'muted.1',
      alignItems: 'center',
    },
  },
}
