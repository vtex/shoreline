import React from 'react'
import type { SwitchProps as AdminUISwitchProps } from '@vtex/admin-ui'
import { Switch as AdminUISwitch, useSwitchState } from '@vtex/admin-ui'

import type { FormFieldProps } from '../util'
import { hasError, getErrorText, useFieldDx } from '../util'

/**
 * Admin UI Switch controlled by useFormState
 * @example
 * const form = useFormState()
 *
 * <Switch name="required-name" state={form} />
 */
export function Switch(props: SwitchProps) {
  const { state, name = '', validation, ...rest } = props
  const { register, getValues } = state

  const switchState = useSwitchState({
    state: getValues(name),
  })

  useFieldDx(props)

  return (
    <AdminUISwitch
      error={hasError(state, name)}
      errorText={getErrorText(state, name)}
      state={switchState}
      {...register(name, validation)}
      {...rest}
    />
  )
}

type SwitchHiddenProps =
  | 'name'
  | 'error'
  | 'errorText'
  | 'required'
  | 'onChange'
  | 'onBlur'
  | 'maxLength'
  | 'minLength'
  | 'max'
  | 'min'
  | 'pattern'
  | 'disabled'
  | 'value'

type InheritedProps = Omit<AdminUISwitchProps, SwitchHiddenProps>

export type SwitchProps = InheritedProps & FormFieldProps
