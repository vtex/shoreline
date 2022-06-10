import React from 'react'
import type { NumberInputProps as AdminUINumberInputProps } from '@vtex/admin-ui'
import { NumberInput as AdminUIInput, omit } from '@vtex/admin-ui'

import type { FormFieldProps } from '../util'
import { hasError, getErrorText, useFieldDx } from '../util'

/**
 * Admin UI NumberInput controlled by useFormState
 * @example
 * const form = useFormState()
 *
 * <NumberInput name="required-name" state={form} />
 */
export function NumberInput(props: NumberInputProps) {
  const { state, name = '', validation, ...rest } = props
  const { register, setValue } = state

  useFieldDx(props)

  const enhancedProps = omit(
    register(name, {
      ...validation,
      setValueAs: (value) => (Number.isNaN(value) ? 0 : Number(value)),
    }),
    ['onChange']
  )

  return (
    <AdminUIInput
      error={hasError(state, name)}
      errorText={getErrorText(state, name)}
      onChange={(value) => setValue(name, value)}
      value={state.getValues(name)}
      {...enhancedProps}
      {...rest}
    />
  )
}

type InputHiddenProps =
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

type InheritedProps = Omit<AdminUINumberInputProps, InputHiddenProps>

export type NumberInputProps = InheritedProps & FormFieldProps
