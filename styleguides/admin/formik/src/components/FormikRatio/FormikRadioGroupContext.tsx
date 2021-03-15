import React from 'react'
import { RadioStateReturn } from '@vtex/admin-ui'
import invariant from 'tiny-invariant'

export const FormikRadioGroupContext = React.createContext< RadioStateReturn | null>(null);

export function useRadioGroupContext() {
  const context = React.useContext(FormikRadioGroupContext)

  invariant(context, 'You must use Radio inside RadioGroup!')

  return context
}