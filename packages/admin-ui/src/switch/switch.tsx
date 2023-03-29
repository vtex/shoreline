import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import type { CheckboxState } from 'ariakit/checkbox'
import { useCheckboxState } from 'ariakit/checkbox'
import { useId } from '@vtex/admin-ui-hooks'

import { Inline } from '../inline'
import type { SwitchButtonProps } from './switch-button'
import { SwitchButton } from './switch-button'
import { Stack } from '../stack'
import { Label } from '../label'
import { FormControl, FormControlMessage } from '../form-control'

import { labelTheme } from './switch.css'

export const Switch = forwardRef(function Switch(
  props: SwitchProps,
  ref: Ref<HTMLInputElement>
) {
  const {
    id: defaultId,
    state,
    helpText,
    errorText,
    label,
    error,
    disabled,
    ...htmlProps
  } = props

  const id = useId(defaultId)

  return (
    <FormControl>
      <Inline hSpace="$space-2" vSpace="">
        <SwitchButton
          ref={ref}
          id={id}
          state={state}
          disabled={disabled}
          {...htmlProps}
        />
        <Stack space="$space-05">
          <Label htmlFor={id} className={labelTheme}>
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

export type SwitchProps = SwitchButtonProps & {
  label: ReactNode
  helpText?: ReactNode
  errorText?: ReactNode
  error?: boolean
}

export type SwitchState = CheckboxState

export { useCheckboxState as useSwitchState }
