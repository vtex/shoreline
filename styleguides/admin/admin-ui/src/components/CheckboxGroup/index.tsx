import React, { ReactNode } from 'react'
import { useSystem } from '@vtex/admin-core'

import { Label } from '@vtex/admin-components'
import { SystemComponent } from '../../types'

export function CheckboxGroup(props: CheckboxGroupProps) {
  const {
    csx,
    label,
    id,
    orientation = 'horizontal',
    size = 'regular',
    children,
    ...htmlProps
  } = props
  const { cn } = useSystem()

  const className = cn({
    ...csx,
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

export interface CheckboxGroupProps extends SystemComponent {
  children?: ReactNode
  id?: string
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
}
