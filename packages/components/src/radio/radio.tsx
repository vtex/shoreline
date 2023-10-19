import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Radio as BaseRadio } from '@ariakit/react'

export const Radio = forwardRef<HTMLDivElement, RadioProps>(function Radio(
  props,
  ref
) {
  const { error, disabled, value, ...otherProps } = props

  return (
    <div data-sl-radio ref={ref} {...otherProps}>
      <BaseRadio
        data-sl-radio-button
        value={value}
        data-error={error || 'false'}
        data-disabled={disabled}
        {...otherProps}
      />
    </div>
  )
})

export interface RadioProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'value'> {
  className?: string
  error?: boolean
  value: string
}
