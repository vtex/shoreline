import type { ReactNode } from 'react'
import React, { Fragment } from 'react'
import type { RadioGroupProps as ReakitRadioGroupProps } from 'reakit/Radio'
import { RadioGroup as ReakitRadioGroup } from 'reakit/Radio'
import { useSystem } from '@vtex/admin-core'

import type { SystemComponent } from '../../types'
import { Label } from '../Label'

export function RadioGroup(props: RadioGroupProps) {
  const {
    label,
    orientation = 'horizontal',
    size = 'regular',
    csx,
    id,
    state,
    children,
    ...htmlProps
  } = props

  const { cn } = useSystem()
  const className = cn({
    ...csx,
    themeKey: `components.controlGroup.${orientation}-${size}`,
  })

  return (
    <Fragment>
      {label && <Label htmlFor={id}>{label}</Label>}
      <ReakitRadioGroup
        className={className}
        orientation={orientation}
        id={id}
        {...state}
        {...htmlProps}
      >
        {children}
      </ReakitRadioGroup>
    </Fragment>
  )
}

export interface RadioGroupProps extends SystemComponent {
  label?: string
  size?: 'regular' | 'small'
  orientation?: 'horizontal' | 'vertical'
  state: ReakitRadioGroupProps
  children?: ReactNode
  id?: string
}
