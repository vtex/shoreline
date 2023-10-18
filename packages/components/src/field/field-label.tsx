import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel(props, ref) {
    const { className, children, ...restProps } = props

    return (
      <label ref={ref} className={className} data-sl-field-label {...restProps}>
        {children}
      </label>
    )
  }
)

export type FieldLabelProps = ComponentPropsWithoutRef<'label'>
