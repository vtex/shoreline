import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

/**
 * Form label component.
 * It renders a label jsx element by default
 * @example
 * <Label>label</Label>
 */
export const Label = jsx('label')({
  text: '$body',
})

export type LabelProps = ComponentPropsWithRef<typeof Label>
