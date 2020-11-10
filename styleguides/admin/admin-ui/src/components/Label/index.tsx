import { ReactNode, forwardRef, Ref } from 'react'
import { Box as ReakitBox } from 'reakit'
import { TextPattern, SpaceStyleProps } from '@vtex/admin-ui-theme'

import { createElement } from '../../system'
import { useComponent } from '../../hooks/useComponent'
import { Overridable } from '../../types'

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
export const Label = forwardRef(function Heading(
  props: LabelProps,
  ref: Ref<HTMLHeadingElement>
) {
  const labelProps = useComponent({
    props: { text: 'body', ...props },
  })

  return createElement({
    ref,
    element: 'label',
    component: ReakitBox,
    htmlProps: labelProps,
  })
})

export interface LabelProps extends Overridable, TextPattern, SpaceStyleProps {
  /**
   * label children
   */
  children?: ReactNode
  /**
   * label native htmlFor
   */
  htmlFor?: string
}
