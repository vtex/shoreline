import React, { cloneElement } from 'react'
import type { RadioGroupProps as AdminUIRadioGroupProps } from '@vtex/admin-ui'
import { RadioGroup as AdminUIRadioGroup, useRadioState } from '@vtex/admin-ui'

import type { FormFieldProps } from '../util'
import { hasError, getErrorText, useFieldDx } from '../util'

/**
 * Admin UI RadioGroup controlled by useFormState
 * @example
 * const form = useFormState()
 *
 * <RadioGroup name="required-name" state={form}>
 *  <Radio />
 * </RadioGroup>
 */
export function RadioGroup(props: RadioGroupProps) {
  const { state, name = '', validation, children, ...rest } = props

  useFieldDx(props)

  const radio = useRadioState({
    defaultValue: state.getValues(name),
  })

  const registeredProps = state.register(name, validation)

  return (
    <AdminUIRadioGroup
      state={radio}
      error={hasError(state, name)}
      errorText={getErrorText(state, name)}
      {...rest}
    >
      {React.Children.map(children, (child) => {
        return cloneElement(child as any, registeredProps)
      })}
    </AdminUIRadioGroup>
  )
}

type RadioGroupHiddenProps = 'state' | 'error' | 'errorText'

type InheritedProps = Omit<AdminUIRadioGroupProps, RadioGroupHiddenProps>

export type RadioGroupProps = InheritedProps & FormFieldProps
