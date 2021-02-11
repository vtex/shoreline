import { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'

import { SystemComponent } from '../../types'
import { Primitive, PrimitiveProps } from '../Primitive'

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
  const { styleOverrides, ...htmlProps } = props

  return {
    element: 'label',
    styles: {
      text: 'body',
      ...styleOverrides,
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
