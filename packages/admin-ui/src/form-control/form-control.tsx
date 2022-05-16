import type { ReactNode } from 'react'
import React from 'react'

import { Stack } from '../stack'

import { FormControlProvider } from './context'

export function FormControl(props: FormGroupOptions) {
  const { children, ...remainingProps } = props

  return (
    <FormControlProvider {...remainingProps}>
      <Stack space="$m">{children}</Stack>
    </FormControlProvider>
  )
}

export type FormControlProps = React.ComponentPropsWithoutRef<
  typeof FormControl
>

export interface FormGroupOptions {
  children?: ReactNode
  error?: boolean
  optional?: boolean
}
