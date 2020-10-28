import React, { ReactNode } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

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
  } = props

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `components.controlGroup.${orientation}-${size}`,
  })

  return (
    <>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div role="group" id={id} className={className}>
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
