import React from 'react'
import invariant from 'tiny-invariant'

export interface RadioContextProps {
  setTouched: (value: boolean) => void
}

export const FormikRadioGroupContext =
  React.createContext<RadioContextProps | null>(null)

export function useRadioGroupContext() {
  const context = React.useContext(FormikRadioGroupContext)

  invariant(context, 'You must use FormikRadio inside FormikRadioGroup!')

  return context
}
