import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel(props, ref) {
    const { children, ...restProps } = props

    return (
      <label ref={ref} data-sl-field-label {...restProps}>
        {children}
      </label>
    )
  }
)

export type FieldLabelProps = ComponentPropsWithoutRef<'label'>
