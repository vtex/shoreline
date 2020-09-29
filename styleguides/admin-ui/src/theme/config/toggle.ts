import { mergeSx } from '@vtex-components/theme'

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
  '&:active': {
    backgroundColor: 'muted.0',
    borderColor: 'muted.0',
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
  'toggle-regular': mergeSx(styles, {
    height: 7,
    width: 11,
    '&:after': {
      width: '1.125rem',
      height: '1.125rem',
    },
    '&:checked': {
      '&:after': {
        transform: 'translateX(1rem)',
      },
    },
  }),
  'toggle-small': mergeSx(styles, {
    height: 6,
    width: 9,
    '&:after': {
      width: '0.875rem',
      height: '0.875rem',
    },
    '&:checked': {
      '&:after': {
        transform: 'translateX(0.75rem)',
      },
    },
  }),
}
