import React from 'react'
import {
  Checkbox,
  CheckboxProps,
} from '@vtex/admin-ui'
import { useCheckboxGroupContext } from './FormikCheckboxGroupContext'

export interface FormikCheckboxProps extends Omit<CheckboxProps,'state'> {}

export const FormikCheckbox = ({ ...props }: FormikCheckboxProps) => {

  const checkboxState = useCheckboxGroupContext()

  return (
    <Checkbox state={checkboxState} {...props} />
  )
}
