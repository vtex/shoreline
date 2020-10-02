const styles = {
  appearance: 'none',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'muted.1',
  borderRadius: 3,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:checked': {
    backgroundColor: 'primary.base',
    borderColor: 'primary.base',
    '&:after': {
      content: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
    },
    '&[disabled]:after': {
      content: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='%238B9299' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
    },
    '&:hover': {
      backgroundColor: 'primary.hover',
      borderColor: 'primary.hover',
    },
    '&:active': {
      backgroundColor: 'primary.active',
      borderColor: 'primary.active',
    },
  },
  '&:indeterminate': {
    backgroundColor: 'primary.washed.0',
    borderColor: 'primary.base',
    color: 'primary.base',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: 8,
      height: 0,
      borderWidth: 1,
      borderStyle: 'solid',
      borderLeft: 0,
      borderRight: 0,
      borderRadius: 3,
      borderColor: 'currentColor',
    },
    '&:disabled': {
      backgroundColor: 'muted.2',
      borderColor: 'muted.1',
      color: 'muted.1',
    },
    '&:hover': {
      borderColor: 'primary.hover',
      color: 'primary.hover',
      bg: 'primary.washed.1',
    },
    '&:active': {
      borderColor: 'primary.active',
      color: 'primary.active',
    },
  },
  '&:disabled': {
    backgroundColor: 'muted.2',
    borderColor: 'muted.1',
    color: 'muted.1',
  },
  '&:hover': {
    borderColor: 'text',
  },
  '&:active': {
    backgroundColor: 'primary.washed.0',
    borderColor: 'muted.0',
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
  'checkbox-regular': {
    ...styles,
    height: 20,
    width: 20,
    minWidth: 20,
    minHeight: 20,
  },
  'checkbox-small': {
    ...styles,
    height: 16,
    width: 16,
    minWidth: 16,
    minHeight: 16,
  },
}
