import { merge } from '@vtex/admin-ui-system'

const style = {
  appearance: 'none',
  margin: 0,
  position: 'relative',
  cursor: 'pointer',
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'mid.secondary',
  backgroundColor: 'transparent',
  borderRadius: 'circle',
  ':after': {
    content: '""',
    display: 'block',
    borderRadius: 'circle',
    backgroundColor: 'light.primary',
    opacity: 0,
  },
  ':checked': {
    backgroundColor: 'blue',
    borderColor: 'blue',
    ':after': {
      opacity: 1,
    },
    ':hover': {
      backgroundColor: 'blue.hover',
      borderColor: 'blue.hover',
    },
    ':active': {
      borderColor: 'blue.pressed',
      backgroundColor: 'blue.pressed',
    },
  },
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: 'mid.tertiary',
    borderColor: 'mid.primary',
    ':after': {
      backgroundColor: 'mid.primary',
    },
  },
  ':hover': {
    borderColor: 'dark.primary',
  },
  ':active': {
    borderColor: 'dark.secondary',
    backgroundColor: 'blue.secondary',
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
