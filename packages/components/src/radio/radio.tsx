import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Radio as BaseRadio } from '@ariakit/react'
import { useId } from '@vtex/shoreline-utils'

import { Label } from '../label'

/**
 * Radio inputs allow users to select one option from a list. It should be used inside a RadioGroup component.
 *
 * @example
 * <RadioGroup label="Radio group">
 *  <Radio value="1">Option 1</Radio>
 *  <Radio value="2">Option 2</Radio>
 *  <Radio value="3">Option 3</Radio>
 * </RadioGroup>
 */
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
  /**
   * Wether is disabled
   * @default false
   */
  error?: boolean
  /**
   * The value of the radio
   */
  value: string
}
