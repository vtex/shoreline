import React from 'react'
import {
  CheckboxStateReturn,
} from '@vtex/admin-ui'
import invariant from 'tiny-invariant'

export interface CheckboxContextProps {
  state: CheckboxStateReturn,
  setTouched: (value:boolean)=>void
}

export const FormikCheckboxGroupContext = React.createContext< CheckboxContextProps | null>(null);

export function useCheckboxGroupContext() {
  const context = React.useContext(FormikCheckboxGroupContext)

  invariant(context, 'You must use Radio inside RadioGroup!')

  return context
}