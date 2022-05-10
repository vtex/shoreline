import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { RadioState } from 'ariakit/radio'
import { RadioGroup as AriakitRadioGroup } from 'ariakit/radio'

import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'
import { Stack } from '../stack'

export const RadioGroup = createComponent<'fieldset', RadioGroupOptions>(
  (props) => {
    const {
      label,
      helpText,
      errorText,
      children,
      direction,
      state,
      error,
      optional,
      ...restProps
    } = props

    return useElement('fieldset', {
      ...restProps,
      children: (
        <FormControl error={error} optional={optional}>
          <FormControlLabel as="legend">{label}</FormControlLabel>
          <AriakitRadioGroup state={state}>
            <Stack direction={direction} space="$xl" csx={{ marginY: '$m' }}>
              {children}
            </Stack>
          </AriakitRadioGroup>
          <FormControlMessage helpText={helpText} errorText={errorText} />
        </FormControl>
      ),
    })
  }
)

export type RadioGroupProps = React.ComponentPropsWithoutRef<typeof RadioGroup>

export interface RadioGroupOptions {
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
