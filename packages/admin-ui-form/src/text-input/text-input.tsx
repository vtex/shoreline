import React from 'react'
import type { TextInputProps as AdminUIInputProps } from '@vtex/admin-ui'
import { TextInput as AdminUIInput } from '@vtex/admin-ui'

import type { FormState, RegisterOptions } from '../form'
import { hasError, getErrorText, useFieldDx } from '../util'

/**
 * Admin UI TextInput controlled by useFormState
 * @example
 * const form = useFormState()
 *
 * <TextInput name="required-name" state={form} />
 */
export function TextInput(props: TextInputProps) {
  const { state, name = '', validation, ...rest } = props
  const { register } = state

  useFieldDx(props)

  return (
    <AdminUIInput
      error={hasError(state, name)}
      errorText={getErrorText(state, name)}
      {...register(name, validation)}
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

type InheritedProps = Omit<AdminUIInputProps, InputHiddenProps>

export interface TextInputProps extends InheritedProps {
  /**
   * Input required state
   */
  name: string
  /**
   * Form state
   */
  state: FormState
  /**
   * Field validation
   */
  validation?: RegisterOptions
}
