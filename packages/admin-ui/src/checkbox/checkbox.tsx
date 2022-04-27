import type { ReactNode } from 'react'
import React from 'react'
import { createComponent } from '@vtex/admin-ui-react'
import { unstable_useId as useId } from 'reakit/Id'

import { Label } from '../components/Label'
import { Set } from '../components/Set'
import { Inline } from '../inline'
import { CheckboxInput } from './checkbox-input'
import { Message } from './message'

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
        <Set orientation="vertical" spacing="$s">
          <Label htmlFor={baseId} csx={style.label}>
            {label}
          </Label>
          <Message helpText={helpText} error={error} errorText={errorText} />
        </Set>
      </Inline>
    )
  }
)

export interface CheckboxOptions {
  /**
   * Whether has a error or not
   * @default false
   */
  error?: boolean
  /**
   * Checkbox error text. It appears when error property is set to true.
   */
  errorText?: ReactNode
  /**
   * Helper text
   */
  helpText?: ReactNode
  /**
   * Checkbox label
   */
  label: ReactNode
}

export type CheckboxProps = React.ComponentPropsWithRef<typeof Checkbox>
