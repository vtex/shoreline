import React from 'react'
import {
  Checkbox,
  CheckboxProps,
} from '@vtex/admin-ui'
import { useCheckboxGroupContext } from './context'

export interface FormikCheckboxProps extends Omit<CheckboxProps,'state'> {}

export const FormikCheckbox = ({ ...props }: FormikCheckboxProps) => {

  const {state, setTouched} = useCheckboxGroupContext()

  return (
    <div onClick={()=>setTouched(true)}>
      <Checkbox state={state} {...props} />
    </div>
  )
}
