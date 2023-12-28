import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Radio as BaseRadio } from '@ariakit/react'
import { useId } from '@vtex/shoreline-utils'

import { Label } from '../label'

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
    <div data-sl-radio>
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
      <Label htmlFor={id} data-disabled={disabled}>
        {children}
      </Label>
    </div>
  )
})

export interface RadioProps extends ComponentPropsWithoutRef<'input'> {
  error?: boolean
  value: string
}
