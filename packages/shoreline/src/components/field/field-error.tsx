import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { useStore } from '@vtex/shoreline-utils'

import { Compose } from '../compose'
import { useFieldContext } from './field-context'

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

export interface FieldErrorOptions {
  /**
   * Enables component composition
   * @default false
   */
  asChild?: boolean
}

export type FieldErrorProps = FieldErrorOptions &
  ComponentPropsWithoutRef<'div'>
