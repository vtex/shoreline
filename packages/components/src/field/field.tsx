import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import './field.css'

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  props,
  ref
) {
  const { children, variant = 'default', ...restProps } = props

  return (
    <div ref={ref} data-sl-field data-variant={variant} {...restProps}>
      {children}
    </div>
  )
})

export interface FieldProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'control' | 'group'
}
