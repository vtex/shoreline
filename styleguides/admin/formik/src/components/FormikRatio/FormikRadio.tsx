import React, { forwardRef, Ref } from 'react'
import { Radio, RadioProps } from '@vtex/admin-ui'
import { useRadioGroupContext } from './context'

export interface FormikRadioProps extends Omit<RadioProps,'state'> {}

export const FormikRadio = forwardRef(( props : FormikRadioProps, ref: Ref<HTMLInputElement>) => {
  const {state, setTouched} = useRadioGroupContext()

  return (
    <Radio state={state} {...props} ref={ref} onBlur={()=>setTouched(true)}/>
  )
})
