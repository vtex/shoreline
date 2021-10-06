import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

/**
 * Anchor component
 * @example
 * <Anchor href="#">Link to #</Anchor>
 */
export const Anchor = jsx('a')({
  font: 'inherit',
  color: 'link',
  textDecoration: 'none',
  cursor: 'pointer',
  ':visited': {
    color: 'linkVisited',
  },
  ':hover': {
    color: 'linkHover',
    textDecoration: 'underline',
  },
})

export type AnchorProps = ComponentPropsWithRef<typeof Anchor>
