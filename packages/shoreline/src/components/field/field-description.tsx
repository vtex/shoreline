import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Compose } from '../compose'

/**
 * Description of a Field
 */
export const FieldDescription = forwardRef<
  HTMLDivElement,
  FieldDescriptionProps
>(function FieldDescription(props, ref) {
  const { asChild = false, children, id: defaultId, ...domProps } = props

  const Comp = asChild ? Compose : 'div'

  return (
    <Comp data-sl-field-description ref={ref} {...domProps}>
      {children}
    </Comp>
  )
})

export interface FieldDescriptionOptions {
  /**
   * Enables component composition
   * @default false
   */
  asChild?: boolean
}

export type FieldDescriptionProps = FieldDescriptionOptions &
  ComponentPropsWithoutRef<'div'>
