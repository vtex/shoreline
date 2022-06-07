import React from 'react'
import type { next_SelectProps as AdminUISelectProps } from '@vtex/admin-ui'
import { next_Select as AdminUISelect } from '@vtex/admin-ui'

import type { FormFieldProps } from '../util'
import { hasError, getErrorText, useFieldDx } from '../util'

/**
 * Admin UI Select controlled by useFormState
 * @example
 * const form = useFormState()
 *
 * <Select name="required-name" state={form}>
 *  <option value="value">value</option>
 * </Select>
 */
export function Select(props: SelectProps) {
  const { state, name = '', validation, ...rest } = props
  const { register } = state

  useFieldDx(props)

  return (
    <AdminUISelect
      error={hasError(state, name)}
      errorText={getErrorText(state, name)}
      {...register(name, validation)}
      {...rest}
    />
  )
}

type SelectHiddenProps =
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

type InheritedProps = Omit<AdminUISelectProps, SelectHiddenProps>

export type SelectProps = InheritedProps & FormFieldProps
