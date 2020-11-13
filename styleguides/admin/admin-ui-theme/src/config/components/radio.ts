import { merge } from '@vtex/admin-ui-system'

const style = {
  appearance: 'none',
  margin: 0,
  position: 'relative',
  cursor: 'pointer',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'muted.1',
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
      borderColor: 'primary.pressed',
      backgroundColor: 'primary.pressed',
    },
  },
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: 'muted.2',
    borderColor: 'muted.0',
    ':after': {
      backgroundColor: 'muted.0',
    },
  },
  ':hover': {
    borderColor: 'text.primary',
  },
  ':active': {
    borderColor: 'text.secondary',
    backgroundColor: 'secondary',
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

const regular = merge(style, {
  height: 20,
  width: 20,
  padding: '5px',
  ':after': {
    width: 8,
    height: 8,
  },
})

const small = merge(style, {
  height: 16,
  width: 16,
  padding: 1,
  ':after': {
    width: 6,
    height: 6,
  },
})

export default {
  regular,
  small,
}
