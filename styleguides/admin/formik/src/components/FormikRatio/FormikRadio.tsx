import React from 'react'
import { Radio, RadioProps } from '@vtex/admin-ui'
import { useRadioGroupContext } from './FormikRadioGroupContext'

export interface FormikRadioProps extends Omit<RadioProps,'state'> {}

export const FormikRadio = ({ ...props }: FormikRadioProps) => {
  const radioState = useRadioGroupContext()

  return (
    <Radio state={radioState} {...props} />
  )
}
