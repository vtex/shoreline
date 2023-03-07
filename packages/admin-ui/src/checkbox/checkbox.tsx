import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'

import { unstable_useId as useId } from 'reakit/Id'

import { Label } from '../label'
import { Stack } from '../stack'
import { Inline } from '../inline'
import { CheckboxInput } from './checkbox-input'
import type { CheckboxInputProps } from './checkbox-input'
import { FormControl, FormControlMessage } from '../form-control'
import { labelTheme } from './checkbox.css'

export const Checkbox = forwardRef(function Checkbox(
  props: CheckboxProps,
  ref: Ref<HTMLInputElement>
) {
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
    <FormControl>
      <Inline hSpace="$space-2" vSpace="" spaceInside>
        <CheckboxInput
          ref={ref}
          id={baseId}
          error={error}
          {...checkboxInputProps}
        />
        <Stack space="$space-05">
          <Label htmlFor={baseId} className={labelTheme}>
            {label}
          </Label>
          <FormControlMessage
            error={error}
            helpText={helpText}
            errorText={errorText}
          />
        </Stack>
      </Inline>
    </FormControl>
  )
})

export type CheckboxProps = CheckboxInputProps & {
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

export { useCheckboxState } from './use-checkbox-state'
export type { CheckboxState, CheckboxStateReturn } from './use-checkbox-state'
