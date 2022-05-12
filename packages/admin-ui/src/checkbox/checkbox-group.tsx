import type { ReactNode } from 'react'
import React from 'react'
import { createComponent } from '@vtex/admin-ui-react'
import { Group as AriaCheckboxGroup } from 'ariakit/group'

import { Stack } from '../stack'

import {
  FormControl,
  FormControlLabel,
  FormControlMessage,
} from '../form-control'

export const CheckboxGroup = createComponent<'div', CheckboxGroupOptions>(
  (props) => {
    const { children, label, helpText, errorText, error, optional, direction } =
      props

    return (
      <FormControl error={error} optional={optional}>
        <FormControlLabel as="span">{label}</FormControlLabel>
        <AriaCheckboxGroup>
          <Stack direction={direction} space="$xl" csx={{ marginY: '$m' }}>
            {children}
          </Stack>
        </AriaCheckboxGroup>
        <FormControlMessage helpText={helpText} errorText={errorText} />
      </FormControl>
    )
  }
)

export interface CheckboxGroupOptions {
  /**
   * CheckboxGroup children direction
   * @default row
   */
  direction?: 'row' | 'column'
  /**
   * Whether is a error field or not
   * @default false
   */
  error?: boolean
  /**
   * CheckboxGroup error text. It appears when error property is set to true.
   */
  errorText?: ReactNode
  /**
   * CheckboxGroup helper text
   */
  helpText?: ReactNode
  /**
   * Whether is a optional field or not
   */
  optional?: boolean
  /**
   * CheckboxGroup label
   */
  label: ReactNode
}

export type CheckboxGroupProps = React.ComponentPropsWithoutRef<
  typeof CheckboxGroup
>
