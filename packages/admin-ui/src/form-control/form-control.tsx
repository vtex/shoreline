import type { ReactNode } from 'react'
import React from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'

import { Stack } from '../stack'

import { FormControlProvider } from './context'

export function FormControl(props: FormGroupOptions) {
  const { children, csx, ...remainingProps } = props

  return (
    <FormControlProvider {...remainingProps}>
      <Stack space="$m" csx={csx}>
        {children}
      </Stack>
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
  csx?: StyleProp
}
