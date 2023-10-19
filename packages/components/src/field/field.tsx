import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  props,
  ref
) {
  const { children, ...restProps } = props

  return (
    <div ref={ref} data-sl-field {...restProps}>
      {children}
    </div>
  )
})

export type FieldProps = ComponentPropsWithoutRef<'div'>
