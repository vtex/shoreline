import React, { ReactNode } from 'react'
import { useSystem } from '../../system'

import { Label } from '../Label'
import { Overridable } from '../../types'

export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    styleOverrides,
    label,
    id,
    orientation = 'horizontal',
    size = 'regular',
    children,
    ...htmlProps
  } = props
  const { cn } = useSystem()

  const className = cn({
    ...styleOverrides,
    themeKey: `components.controlGroup.${orientation}-${size}`,
  })

  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div {...htmlProps} role="group" id={id} className={className}>
        {children}
      </div>
    </>
  )
}

export interface CheckboxGroupProps extends Overridable {
  children?: ReactNode
  id?: string
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
}
