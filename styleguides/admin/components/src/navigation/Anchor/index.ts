import { createOnda } from '@vtex/admin-core'

/**
 * A navigation link
 * It renders a `a` jsx element by default
 * @example

 * import { Anchor } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   return <Anchor href="your link">Link to something</Anchor>
 * }
 */
export const Anchor = createOnda('a', {
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
