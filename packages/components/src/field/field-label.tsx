import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel(props, ref) {
    const { children, disabled = false, ...restProps } = props

    return (
      <label
        ref={ref}
        data-sl-field-label
        data-disabled={disabled}
        {...restProps}
      >
        {children}
      </label>
    )
  }
)

export interface FieldLabelProps extends ComponentPropsWithoutRef<'label'> {
  disabled?: boolean
}
