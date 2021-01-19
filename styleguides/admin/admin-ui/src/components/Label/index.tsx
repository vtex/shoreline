import { ReactNode, forwardRef, Ref } from 'react'
import { Box as ReakitBox } from 'reakit'

import { useSystem, jsxs } from '../../system'
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
  const labelProps = useLabel(props)

  return jsxs({
    ref,
    element: 'label',
    component: ReakitBox,
    props: labelProps,
  })
})

export function useLabel(props: LabelProps) {
  const { styleOverrides, ...htmlProps } = props
  const { cn } = useSystem()

  const className = cn({
    text: 'body',
    ...styleOverrides,
  })

  return {
    className,
    ...htmlProps,
  }
}

export interface LabelProps extends Overridable {
  /**
   * label children
   */
  children?: ReactNode
  /**
   * label native htmlFor
   */
  htmlFor?: string
}
