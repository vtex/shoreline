import React from 'react'
import type { CheckboxProps as AdminUICheckboxProps } from '@vtex/admin-ui'
import { Checkbox as AdminUICheckbox } from '@vtex/admin-ui'

import { useCheckboxGroupContext } from './checkbox-group-context'
import type { FormFieldProps } from '../util'
import { hasError, getErrorText, isDevMode, developerMessage } from '../util'

/**
 * Admin UI Checkbox controlled by useFormState
 * @example
 * // Standalone
 * const form = useFormState()
 * <Checkbox name="required-name" state={form} />
 *
 * // Withing a group
 * const form = useFormState()
 * <CheckboxGroup label="Group label" name="required-name" state={form}>
 *  <Checkbox value="unique-value" label="Label"/>
 * </CheckboxGroup>
 */
export function Checkbox(props: CheckboxProps) {
  const { state, name = '', validation, ...checkboxProps } = props
  const context = useCheckboxGroupContext()

  const isGrouped = !!context

  if (isDevMode()) {
    const isStandalone = !!name || !!state || !!validation

    if (isGrouped) {
      if (isStandalone) {
        developerMessage({
          tone: 'error',
          text: 'You are within a Group! The state, name, and validation props should be on the CheckboxGroup component',
        })
      }

      if (!checkboxProps.value) {
        developerMessage({
          tone: 'error',
          text: 'You are within a Group! Add the `value` prop to each checkbox to give then meaning',
        })
      }
    } else {
      if (!name) {
        developerMessage({
          tone: 'error',
          text: 'Your checkbox must have a name',
        })
      }

      if (!state) {
        developerMessage({
          tone: 'error',
          text: 'Your checkbox must have a state',
        })
      }
    }
  }

  const enhancedProps = isGrouped
    ? {
        ...context.register,
      }
    : {
        error: hasError(state!, name),
        errorText: getErrorText(state!, name),
        ...state?.register(name, validation),
      }

  return <AdminUICheckbox {...enhancedProps} {...checkboxProps} />
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
  | 'state'

type InheritedProps = Omit<AdminUICheckboxProps, InputHiddenProps>

export type CheckboxProps = InheritedProps & Partial<FormFieldProps>
