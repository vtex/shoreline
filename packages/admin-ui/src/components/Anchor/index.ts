import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

/**
 * Anchor component
 * @example
 * <Anchor href="#">Link to #</Anchor>
 */
export const Anchor = createComponent<'a'>((props) => {
  return useElement('a', {
    baseStyle: {
      font: 'inherit',
      color: '$action.main.tertiary',
      textDecoration: 'none',
      cursor: 'pointer',
      ':visited': {
        color: '$action.main.tertiaryPressed',
      },
      ':hover': {
        color: '$action.main.tertiaryHover',
        textDecoration: 'underline',
      },
    },
    ...props,
  })
})

export type AnchorProps = ComponentPropsWithRef<typeof Anchor>
