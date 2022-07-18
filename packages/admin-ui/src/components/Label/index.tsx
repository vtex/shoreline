import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

/**
 * Form label component.
 * It renders a label jsx element by default
 * @example
 * <Label>label</Label>
 */
export const Label = createComponent<'label'>((props) => {
  return useElement('label', {
    baseStyle: {
      text: '$body',
    },
    ...props,
  })
})

export type LabelProps = ComponentPropsWithRef<typeof Label>
