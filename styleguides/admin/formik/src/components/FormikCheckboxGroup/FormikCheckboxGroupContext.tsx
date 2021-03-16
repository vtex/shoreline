import React from 'react'
import {
  CheckboxStateReturn,
} from '@vtex/admin-ui'
import invariant from 'tiny-invariant'

export const FormikCheckboxGroupContext = React.createContext< CheckboxStateReturn | null>(null);

export function useCheckboxGroupContext() {
  const context = React.useContext(FormikCheckboxGroupContext)

  invariant(context, 'You must use Radio inside RadioGroup!')

  return context
}