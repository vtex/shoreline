import React from 'react'
import type { next_TextAreaProps as AdminUITextAreaProps } from '@vtex/admin-ui'
import { next_TextArea as AdminUITextArea } from '@vtex/admin-ui'

import type { FormState, RegisterOptions } from '../form'
import { hasError, getErrorText, useFieldDx } from '../util'

/**
 * Admin UI TextArea controlled by useFormState
 * @example
 * const form = useFormState()
 *
 * <TextArea name="required-name" state={form} />
 */
export function TextArea(props: TextAreaProps) {
  const { state, name = '', validation, ...rest } = props
  const { register } = state

  useFieldDx(props)

  return (
    <AdminUITextArea
      error={hasError(state, name)}
      errorText={getErrorText(state, name)}
      {...register(name, validation)}
      {...rest}
    />
  )
}

type TextAreaHiddenProps =
  | 'name'
  | 'error'
  | 'errorText'
  | 'required'
  | 'onChange'
  | 'onBlur'
  | 'minLength'
  | 'max'
  | 'min'
  | 'pattern'
  | 'disabled'
  | 'value'

type InheritedProps = Omit<AdminUITextAreaProps, TextAreaHiddenProps>

export interface TextAreaProps extends InheritedProps {
  /**
   * TextArea required state
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
