import React from 'react'
import { RadioStateReturn } from '@vtex/admin-ui'
import invariant from 'tiny-invariant'

export interface RadioContextProps {
  state: RadioStateReturn
  setTouched: (value: boolean) => void
}

export const FormikRadioGroupContext = React.createContext<RadioContextProps | null>(
  null
)

export function useRadioGroupContext() {
  const context = React.useContext(FormikRadioGroupContext)

  invariant(context, 'You must use Radio inside RadioGroup!')

  return context
}
