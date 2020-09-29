import { mergeSx } from '@vtex-components/theme'
import { SxStyleProp } from 'theme-ui'

const style = {
  appearance: 'none',
  margin: 0,
  position: 'relative',
  cursor: 'pointer',
  borderStyle: 'solid',
  borderWidth: '1',
  borderColor: 'muted.2',
  backgroundColor: 'transparent',
  borderRadius: '50%',
  ':after': {
    content: '""',
    display: 'block',
    borderRadius: '50%',
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
  'radio-regular': mergeSx<SxStyleProp>(style, {
    height: 7,
    width: 7,
    padding: '0.3125rem',
    ':after': {
      width: 4,
      height: 4,
    },
  }),
  'radio-small': mergeSx<SxStyleProp>(style, {
    height: 6,
    width: 6,
    padding: 3,
    ':after': {
      width: '0.375rem',
      height: '0.375rem',
    },
  }),
}
