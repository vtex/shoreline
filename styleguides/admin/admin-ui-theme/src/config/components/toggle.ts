import { merge } from '@vtex/admin-ui-system'

const styles = {
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '6.25rem',
  backgroundColor: 'mid.0',
  borderStyle: 'solid',
  borderColor: 'mid.0',
  borderWidth: 1,
  '&:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    borderRadius: '1.25rem',
    backgroundColor: 'green.accent',
    transition: 'transform .25s ease',
  },
  '&:checked': {
    backgroundColor: 'green',
    borderColor: 'green',
    '&:hover': {
      backgroundColor: 'green.hover',
      borderColor: 'green.hover',
    },
    '&:disabled': {
      backgroundColor: 'mid.0',
      borderColor: 'mid.0',
      '&:after': {
        backgroundColor: 'mid.1',
      },
    },
  },
  '&:hover': {
    backgroundColor: 'dark.secondary',
    borderColor: 'dark.secondary',
  },
  '&:disabled': {
    backgroundColor: 'mid.0',
    borderColor: 'mid.0',
    '&:after': {
      backgroundColor: 'mid.1',
    },
  },
  ':not(:checked):active': {
    backgroundColor: 'dark.secondary',
    borderColor: 'dark.secondary',
    ':after': {
      backgroundColor: 'blue.secondary',
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
