import React from 'react'
import type { CheckboxGroupProps as AdminUICheckboxGroupProps } from '@vtex/admin-ui'
import { CheckboxGroup as AdminUICheckboxGroup } from '@vtex/admin-ui'

import { CheckboxGroupContextProvider } from './checkbox-group-context'
import type { FormFieldProps } from '../util'
import { hasError, getErrorText, useFieldDx } from '../util'

/**
 * Admin UI CheckboxGroup controlled by useFormState
 * @example
 * const form = useFormState()
 *
 * <CheckboxGroup label="Group label" name="required-name" state={form}>
 *  <Checkbox value="unique-value" label="Label" />
 * </CheckboxGroup>
 */
export function CheckboxGroup(props: CheckboxGroupProps) {
  const { state, name = '', validation, children, ...rest } = props

  useFieldDx(props)

  const register = state.register(name, validation)

  return (
    <AdminUICheckboxGroup
      error={hasError(state, name)}
      errorText={getErrorText(state, name)}
      {...rest}
    >
      <CheckboxGroupContextProvider
        value={{
          register,
        }}
      >
        {children}
      </CheckboxGroupContextProvider>
    </AdminUICheckboxGroup>
  )
}

type CheckboxGroupHiddenProps = 'state' | 'error' | 'errorText'

type InheritedProps = Omit<AdminUICheckboxGroupProps, CheckboxGroupHiddenProps>

export type CheckboxGroupProps = InheritedProps & FormFieldProps
