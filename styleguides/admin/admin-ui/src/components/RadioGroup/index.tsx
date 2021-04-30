import React, { Fragment, ReactNode } from 'react'
import {
  RadioGroup as ReakitRadioGroup,
  RadioGroupProps as ReakitRadioGroupProps,
} from 'reakit/Radio'

import { SystemComponent } from '../../types'
import { Label } from '@vtex/admin-components'
import { useSystem } from '@vtex/admin-core'

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
