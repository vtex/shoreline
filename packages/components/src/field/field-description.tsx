import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Compose } from '@vtex/shoreline-primitives'

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

export interface FieldDescriptionProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}
