import React from 'react'
import { Radio, RadioProps } from '@vtex/admin-ui'
import { useRadioGroupContext } from './context'

export interface FormikRadioProps extends Omit<RadioProps,'state'> {}

export const FormikRadio = ({ ...props }: FormikRadioProps) => {
  const {state, setTouched} = useRadioGroupContext()

  return (
    <div onClick={()=>setTouched(true)}>
      <Radio state={state} {...props} />
    </div>
  )
}
