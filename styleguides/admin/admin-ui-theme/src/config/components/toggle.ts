import { merge } from '@vtex/admin-ui-system'

const styles = {
  appearance: 'none',
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '6.25rem',
  backgroundColor: 'mid.primary',
  borderStyle: 'solid',
  borderColor: 'mid.primary',
  borderWidth: 1,
  '&:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    borderRadius: '1.25rem',
    backgroundColor: 'light.primary',
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
      backgroundColor: 'mid.primary',
      borderColor: 'mid.primary',
      '&:after': {
        backgroundColor: 'mid.secondary',
      },
    },
  },
  '&:hover': {
    backgroundColor: 'dark.secondary',
    borderColor: 'dark.secondary',
  },
  '&:disabled': {
    backgroundColor: 'mid.primary',
    borderColor: 'mid.primary',
    '&:after': {
      backgroundColor: 'mid.secondary',
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
