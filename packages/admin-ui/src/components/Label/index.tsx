import type { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'
import type { PrimitiveProps } from '@vtex/admin-primitives'
import { Primitive } from '@vtex/admin-primitives'

import type { SystemComponent } from '../../types'

/**
 * Form label component.
 * It renders a label jsx element by default
 * @example

 * import { Label, LabelProps } from `@vtex/admin-ui`
 *
 * function UseCase() {
 *   return <Label>Your label here!</Label>
 * }
 */
export const Label = createComponent(Primitive, useLabel)

export function useLabel(props: LabelProps): PrimitiveProps<'label'> {
  const { csx, ...htmlProps } = props

  return {
    element: 'label',
    csx: {
      text: 'body',
      ...csx,
    },
    ...htmlProps,
  }
}

export interface LabelProps extends SystemComponent {
  /**
   * label children
   */
  children?: ReactNode
  /**
   * label native htmlFor
   */
  htmlFor?: string
}
