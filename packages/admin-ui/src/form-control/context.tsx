import React, { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'

import type { FormControlProps } from './form-control'

const FormControlContext = createContext<FormControlProps | null>(null)

export function useFormControlContext() {
  const context = useContext(FormControlContext)

  invariant(
    context,
    'Do not use Form Control composites outside Form Control context!'
  )

  return context
}

export function FormControlProvider(props: FormControlProps) {
  const { children, ...formControlProps } = props

  return (
    <FormControlContext.Provider value={formControlProps}>
      {children}
    </FormControlContext.Provider>
  )
}
