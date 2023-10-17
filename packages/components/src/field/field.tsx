import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef, useId } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { fieldStyle } from './field.css'
import { FieldContext } from './field-context'

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  props,
  ref
) {
  const {
    className,
    children,
    control = false,
    error = false,
    ...restProps
  } = props

  const id = useId()

  return (
    <FieldContext.Provider value={{ id, error }}>
      <div
        ref={ref}
        data-field-control={control}
        data-sl-field
        className={cx(fieldStyle, className)}
        {...restProps}
      >
        {children}
      </div>
    </FieldContext.Provider>
  )
})

export type FieldProps = ComponentPropsWithoutRef<'div'> & {
  control?: boolean
  error?: boolean
}
