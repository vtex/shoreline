import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { useStore } from '@vtex/shoreline-store'

import { Compose } from '@vtex/shoreline-primitives'
import { useFieldContext } from './field-context'
import './field-error.css'

/**
 * Error of a field
 */
export const FieldError = forwardRef<HTMLDivElement, FieldErrorProps>(
  function FieldError(props, ref) {
    const { asChild = false, children, id: defaultId, ...domProps } = props

    const Comp = asChild ? Compose : 'div'

    const store = useFieldContext()
    const error = useStore(store, (s) => s.error)

    if (!error) {
      return <></>
    }

    return (
      <Comp role="alert" data-sl-field-error ref={ref} {...domProps}>
        {children}
      </Comp>
    )
  }
)

export interface FieldErrorProps extends ComponentPropsWithoutRef<'div'> {
  asChild?: boolean
}
