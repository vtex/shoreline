import type { ReactNode } from 'react'
import React from 'react'

import { Stack } from '../stack'

export function FormControl(props: FormGroupOptions) {
  const { children, className } = props

  return (
    <Stack space="$space-1" className={className}>
      {children}
    </Stack>
  )
}

export type FormControlProps = React.ComponentPropsWithoutRef<
  typeof FormControl
>

export interface FormGroupOptions {
  children?: ReactNode
  className?: string
}
