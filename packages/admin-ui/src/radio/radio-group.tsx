import type { ReactNode } from 'react'
import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { RadioState } from 'ariakit/radio'
import { RadioGroup as AriakitRadioGroup } from 'ariakit/radio'

import { FormGroup } from '../form-group'

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
        <FormGroup
          label={label}
          labelAs="legend"
          state={state}
          direction={direction}
          componentGroup={AriakitRadioGroup}
          helpText={helpText}
          error={error}
          errorText={errorText}
          optional={optional}
        >
          {children}
        </FormGroup>
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

export { useRadioState, RadioState } from 'ariakit/radio'
