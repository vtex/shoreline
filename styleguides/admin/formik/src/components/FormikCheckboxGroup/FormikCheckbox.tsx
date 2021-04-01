import React, { forwardRef, Ref } from 'react'
import {
  Checkbox,
  CheckboxProps,
} from '@vtex/admin-ui'
import { useCheckboxGroupContext } from './context'

export interface FormikCheckboxProps extends Omit<CheckboxProps,'state'> {}

export const FormikCheckbox = forwardRef(( props : FormikCheckboxProps, ref: Ref<HTMLInputElement>) => {

  const {state, setTouched} = useCheckboxGroupContext()

  return (
    <Checkbox state={state} {...props} ref={ref} onBlur={()=>setTouched(true)}/>
  )
})
