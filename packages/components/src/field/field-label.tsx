import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { createMessageHook } from '../locale'
import { messages } from './messages'
import './field-label.css'

const useMessage = createMessageHook(messages)

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(
  function FieldLabel(props, ref) {
    const { children, disabled = false, optional, ...restProps } = props

    const getMessage = useMessage()

    const optionalLabel = optional && getMessage('optional')

    return (
      <label
        ref={ref}
        data-sl-field-label
        data-disabled={disabled}
        {...restProps}
      >
        {children} {optionalLabel}
      </label>
    )
  }
)

export interface FieldLabelProps extends ComponentPropsWithoutRef<'label'> {
  disabled?: boolean
  optional?: boolean
}
