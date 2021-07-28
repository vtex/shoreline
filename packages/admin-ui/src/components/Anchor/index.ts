import { jsx, PropsWithAs } from '@vtex/onda-react'

/**
 * Anchor component
 * @example
 * <Anchor href="#">Link to #</Anchor>
 */
export const Anchor = jsx.a({
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

export type AnchorProps = PropsWithAs<{}, 'a'>
