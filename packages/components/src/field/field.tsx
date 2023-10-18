import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { fieldStyle } from './field.css'

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  props,
  ref
) {
  const { className, children, ...restProps } = props

  return (
    <div
      ref={ref}
      data-sl-field
      className={cx(fieldStyle, className)}
      {...restProps}
    >
      {children}
    </div>
  )
})

export type FieldProps = ComponentPropsWithoutRef<'div'>
