import type { ReactNode } from 'react'
import React from 'react'

import { createComponent } from '@vtex/admin-ui-react'
import { unstable_useId as useId } from 'reakit/Id'

import { Label } from '../components/Label'
import { Stack } from '../stack'
import { Inline } from '../inline'
import { CheckboxInput } from './checkbox-input'
import type { CheckboxInputOptions } from './checkbox-input'
import { Message } from '../form-group'

import * as style from './checkbox.style'

export const Checkbox = createComponent<typeof CheckboxInput, CheckboxOptions>(
  (props) => {
    const {
      id,
      label,
      helpText,
      error = false,
      errorText,
      ...checkboxInputProps
    } = props

    const { id: baseId } = useId({ id })

    return (
      <Inline hSpace="$m" vSpace="">
        <CheckboxInput id={baseId} error={error} {...checkboxInputProps} />
        <Stack space="$s">
          <Label htmlFor={baseId} csx={style.label}>
            {label}
          </Label>
          <Message helpText={helpText} error={error} errorText={errorText} />
        </Stack>
      </Inline>
    )
  }
)

export interface CheckboxOptions extends CheckboxInputOptions {
  /**
   * Checkbox error text. It appears when error property is set to true.
   */
  errorText?: ReactNode
  /**
   * Helper text
   */
  helpText?: ReactNode
  /**
  /**
   * Checkbox label
   */
  label?: ReactNode
}

export type CheckboxProps = React.ComponentPropsWithRef<typeof Checkbox>

export { useCheckboxState, CheckboxState, CheckboxStateReturn } from './state'
