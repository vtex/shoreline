export default {
  styles: {
    appearance: 'none',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'mid.primary',
    borderRadius: 3,
    cursor: 'pointer',
    display: 'flex',
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    '&:checked': {
      backgroundColor: 'blue',
      borderColor: 'blue',
      '&:after': {
        content: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
      },
      '&[disabled]:after': {
        content: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8' width='10' height='8' fill='none'><path d='M9 1L4 7L1 4' stroke='%23898F9E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>")`,
      },
      '&:hover': {
        backgroundColor: 'blue.hover',
        borderColor: 'blue.hover',
      },
      '&:active': {
        backgroundColor: 'blue.pressed',
        borderColor: 'blue.pressed',
      },
    },
    '&:indeterminate': {
      backgroundColor: 'blue.secondary',
      borderColor: 'blue',
      color: 'blue',
      '&:after': {
        content: '""',
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
        backgroundColor: 'mid.secondary',
        borderColor: 'mid.primary',
        color: 'mid.primary',
      },
      '&:hover': {
        borderColor: 'blue.hover',
        color: 'blue.hover',
        bg: 'blue.secondary.hover',
      },
      '&:active': {
        borderColor: 'blue.pressed',
        color: 'blue.pressed',
      },
    },
    '&:disabled': {
      backgroundColor: 'mid.secondary',
      borderColor: 'mid.primary',
      color: 'mid.primary',
    },
    '&:hover': {
      borderColor: 'dark.primary',
    },
    '&:active': {
      backgroundColor: 'blue.secondary',
      borderColor: 'dark.secondary',
    },
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
    },
  },
  size: {
    regular: {
      height: 20,
      width: 20,
      minWidth: 20,
      minHeight: 20,
    },
    small: {
      height: 16,
      width: 16,
      minWidth: 16,
      minHeight: 16,
    },
  },
}
