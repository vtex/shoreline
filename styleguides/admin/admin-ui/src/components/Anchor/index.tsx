import { onda } from '@vtex/admin-core'

/**
 * Component to add links within an admin page
 */
export const Anchor = onda('a', {
  font: 'inherit',
  color: 'blue',
  textDecoration: 'none',
  cursor: 'pointer',
  ':active': {
    color: 'blue.pressed',
    textDecoration: 'underline',
  },
  ':hover': {
    color: 'blue.hover',
    textDecoration: 'underline',
  },
})
