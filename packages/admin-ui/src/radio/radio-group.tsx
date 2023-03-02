import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { RadioState } from 'ariakit/radio'
import { RadioGroup as AriakitRadioGroup } from 'ariakit/radio'

import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'
import { Stack } from '../stack'
import { csx } from '@vtex/admin-ui-core'

export const RadioGroup = forwardRef(function RadioGroup(
  props: RadioGroupProps,
  ref: Ref<HTMLFieldSetElement>
) {
  const {
    label,
    helpText,
    errorText,
    children,
    direction,
    state,
    error,
    optional,
    ...htmlProps
  } = props

  return (
    <fieldset {...htmlProps} ref={ref}>
      <FormControl>
        <FormControlLabel optional={optional}>{label}</FormControlLabel>
        <AriakitRadioGroup state={state}>
          <Stack
            direction={direction}
            space="$space-4"
            className={csx({ marginY: '$space-1' })}
          >
            {children}
          </Stack>
        </AriakitRadioGroup>
        <FormControlMessage
          error={error}
          helpText={helpText}
          errorText={errorText}
        />
      </FormControl>
    </fieldset>
  )
})

export type RadioGroupProps = React.ComponentPropsWithoutRef<'fieldset'> & {
  /**
   * useRadioState hook return
   */
  state: RadioState
  /**
   * RadioGroup label
   */
  label: ReactNode
  /**
   * Whether is a error field or not
   * @default false
   */
  error?: boolean
  /**
   * RadioGroup children direction
   * @default row
   */
  direction?: 'row' | 'column'
  /**
   * RadioGroup helper text
   */
  helpText?: ReactNode
  /**
   * RadioGroup error text. It appears when error property is set to true.
   */
  errorText?: ReactNode
  /**
   * Whether the field is optional or not
   */
  optional?: boolean
}

export { useRadioState } from 'ariakit/radio'
export type { RadioState } from 'ariakit/radio'
