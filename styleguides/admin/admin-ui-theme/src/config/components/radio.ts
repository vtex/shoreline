import { merge } from '@vtex/admin-ui-system'

const style = {
  appearance: 'none',
  margin: 0,
  position: 'relative',
  cursor: 'pointer',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'muted.2',
  backgroundColor: 'transparent',
  borderRadius: 'circle',
  ':after': {
    content: '""',
    display: 'block',
    borderRadius: 'circle',
    backgroundColor: 'white',
    opacity: 0,
  },
  ':checked': {
    backgroundColor: 'primary.base',
    borderColor: 'primary.base',
    ':after': {
      opacity: 1,
    },
    ':hover': {
      backgroundColor: 'primary.hover',
      borderColor: 'primary.hover',
    },
    ':active': {
      borderColor: 'primary.active',
      backgroundColor: 'primary.active',
    },
  },
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: 'muted.3',
    borderColor: 'muted.1',
    ':after': {
      backgroundColor: 'muted.1',
    },
  },
  ':hover': {
    borderColor: 'text',
  },
  ':active': {
    borderColor: 'muted.0',
    backgroundColor: 'primary.washed.0',
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
  regular: merge(style, {
    height: 20,
    width: 20,
    padding: '5px',
    ':after': {
      width: 8,
      height: 8,
    },
  }),
  small: merge(style, {
    height: 16,
    width: 16,
    padding: 1,
    ':after': {
      width: 6,
      height: 6,
    },
  }),
}
