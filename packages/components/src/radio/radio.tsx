import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Radio as BaseRadio } from '@ariakit/react'
import { Field, FieldLabel } from '../field'
import { useId } from '@vtex/shoreline-utils'
import './radio.css'

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  props,
  ref
) {
  const {
    error = false,
    disabled,
    children,
    value,
    id: defaultId,
    ...otherProps
  } = props

  const id = useId(defaultId)

  return (
    <Field variant="control" data-sl-radio>
      <FieldLabel htmlFor={id} data-disabled={disabled}>
        {children}
      </FieldLabel>
      <BaseRadio
        data-sl-radio-input
        value={value}
        data-error={error}
        data-disabled={disabled}
        disabled={disabled}
        id={id}
        ref={ref}
        {...otherProps}
      />
    </Field>
  )
})

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean
  value: string
}
