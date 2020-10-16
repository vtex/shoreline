import merge from 'deepmerge'

const styles = {
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '6.25rem',
  backgroundColor: 'muted.1',
  borderStyle: 'solid',
  borderColor: 'muted.1',
  borderWidth: 1,
  '&:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    borderRadius: '1.25rem',
    backgroundColor: 'success.contrast',
    transition: 'transform .25s ease',
  },
  '&:checked': {
    backgroundColor: 'success.base',
    borderColor: 'success.base',
    '&:hover': {
      backgroundColor: 'success.hover',
      borderColor: 'success.hover',
    },
    '&:disabled': {
      backgroundColor: 'muted.1',
      borderColor: 'muted.1',
      '&:after': {
        backgroundColor: 'muted.2',
      },
    },
  },
  '&:hover': {
    backgroundColor: 'muted.0',
    borderColor: 'muted.0',
  },
  '&:disabled': {
    backgroundColor: 'muted.1',
    borderColor: 'muted.1',
    '&:after': {
      backgroundColor: 'muted.2',
    },
  },
  ':not(:checked):active': {
    backgroundColor: 'muted.0',
    borderColor: 'muted.0',
    ':after': {
      backgroundColor: 'primary.washed.0',
    },
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
  regular: merge(styles, {
    height: 20,
    width: 36,
    '&:after': {
      width: 18,
      height: 18,
    },
    '&:checked': {
      '&:after': {
        transform: 'translateX(16px)',
      },
    },
  }),
  small: merge(styles, {
    height: 16,
    width: 28,
    '&:after': {
      width: 14,
      height: 14,
    },
    '&:checked': {
      '&:after': {
        transform: 'translateX(12px)',
      },
    },
  }),
}
