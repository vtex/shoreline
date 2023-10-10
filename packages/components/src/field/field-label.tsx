import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/shoreline-utils'

import { fieldLabelStyle } from './field.css'
import { useFieldContext } from './field-context'

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel(props, ref) {
    const { className, children, ...restProps } = props

    const { id } = useFieldContext()

    return (
      <label
        ref={ref}
        className={cx(fieldLabelStyle, className)}
        data-sl-field-label
        htmlFor={id}
        {...restProps}
      >
        {children}
      </label>
    )
  }
)

export type FieldLabelProps = ComponentPropsWithoutRef<'label'>
